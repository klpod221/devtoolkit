import React, { useState } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MySwitch from "@components/MySwitch";
import CodeOutput from "@components/CodeOutput";

const generateNginxConfig = (cfg) => {
  const upstreams = cfg.upstreamServers
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `    server ${s};`)
    .join("\n");

  const upstreamBlock = cfg.type === "reverse_proxy"
    ? `upstream backend {\n${upstreams}\n}\n\n`
    : "";

  const sslBlock = cfg.ssl
    ? `    listen 443 ssl http2;
    ssl_certificate /etc/nginx/ssl/${cfg.domain}.crt;
    ssl_certificate_key /etc/nginx/ssl/${cfg.domain}.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
`
    : `    listen 80;\n`;

  const wwwRedirect = cfg.wwwRedirect
    ? `server {
    listen 80;
    server_name www.${cfg.domain};
    return 301 $scheme://${cfg.domain}$request_uri;
}

`
    : "";

  const httpToHttps = cfg.ssl
    ? `server {
    listen 80;
    server_name ${cfg.domain};
    return 301 https://$host$request_uri;
}

`
    : "";

  let locationBlock = "";
  if (cfg.type === "static") {
    locationBlock = `    location / {
        root ${cfg.root || "/var/www/html"};
        index index.html index.htm;
        try_files $uri $uri/ =404;
    }`;
  } else if (cfg.type === "php") {
    locationBlock = `    location / {
        root ${cfg.root || "/var/www/html"};
        index index.php index.html;
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \\.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:${cfg.phpSocket || "/run/php/php8.1-fpm.sock"};
    }

    location ~ /\\.ht {
        deny all;
    }`;
  } else if (cfg.type === "reverse_proxy") {
    locationBlock = `    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }`;
  }

  const gzipBlock = cfg.gzip
    ? `    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
`
    : "";

  return `${upstreamBlock}${httpToHttps}${wwwRedirect}server {
${sslBlock}    server_name ${cfg.domain};

    access_log /var/log/nginx/${cfg.domain}.access.log;
    error_log /var/log/nginx/${cfg.domain}.error.log;

    client_max_body_size ${cfg.maxBodySize || "10"}M;
${gzipBlock}
${locationBlock}
}`;
};

const NginxConfigGenerator = () => {
  const [config, setConfig] = useState({
    domain: "example.com",
    type: "static",
    root: "/var/www/html",
    ssl: false,
    wwwRedirect: false,
    gzip: true,
    maxBodySize: "10",
    upstreamServers: "127.0.0.1:3000\n127.0.0.1:3001",
    phpSocket: "/run/php/php8.1-fpm.sock",
  });
  const [output, setOutput] = useState("");

  const update = (key, val) => setConfig((prev) => ({ ...prev, [key]: val }));

  const handleGenerate = () => {
    setOutput(generateNginxConfig(config));
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Nginx Config Generator" helper="Generate production-ready Nginx server block" />
        <div className="space-y-4 mt-4 overflow-y-auto">
          <MyInput label="Domain" value={config.domain} onChange={(v) => update("domain", v)} placeholder="example.com" />
          <MySelect label="Server Type" value={config.type} onChange={(v) => update("type", v)}>
            <option value="static">Static Site</option>
            <option value="php">PHP (FPM)</option>
            <option value="reverse_proxy">Reverse Proxy</option>
          </MySelect>

          {(config.type === "static" || config.type === "php") && (
            <MyInput label="Document Root" value={config.root} onChange={(v) => update("root", v)} placeholder="/var/www/html" />
          )}
          {config.type === "php" && (
            <MyInput label="PHP-FPM Socket" value={config.phpSocket} onChange={(v) => update("phpSocket", v)} placeholder="/run/php/php8.1-fpm.sock" />
          )}
          {config.type === "reverse_proxy" && (
            <div>
              <label className="block text-sm font-medium mb-1">Upstream Servers (one per line)</label>
              <textarea
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-secondary text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                value={config.upstreamServers}
                onChange={(e) => update("upstreamServers", e.target.value)}
                placeholder="127.0.0.1:3000"
              />
            </div>
          )}

          <MyInput label="Max Body Size (MB)" type="number" value={config.maxBodySize} onChange={(v) => update("maxBodySize", v)} />
          <MySwitch label="Enable HTTPS (SSL)" checked={config.ssl} onChange={(v) => update("ssl", v)} />
          <MySwitch label="Redirect www → non-www" checked={config.wwwRedirect} onChange={(v) => update("wwwRedirect", v)} />
          <MySwitch label="Enable Gzip Compression" checked={config.gzip} onChange={(v) => update("gzip", v)} />

          <MyButton onClick={handleGenerate} className="w-full">Generate Config</MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="nginx.conf server block" />
        <CodeOutput output={output} language="nginx" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

NginxConfigGenerator.title = "Nginx Config Generator";
export default NginxConfigGenerator;
