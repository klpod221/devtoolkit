import React, { useState } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MySwitch from "@components/MySwitch";
import MyTabs from "@components/MyTabs";
import CodeOutput from "@components/CodeOutput";

const RUNTIMES = {
  node: { image: "node:20-alpine", workdir: "/app", build: "RUN npm ci --only=production", cmd: '["node", "index.js"]' },
  python: { image: "python:3.11-slim", workdir: "/app", build: "RUN pip install --no-cache-dir -r requirements.txt", cmd: '["python", "main.py"]' },
  go: { image: "golang:1.22-alpine", workdir: "/app", build: "RUN go build -o app .", cmd: '["./app"]' },
  php: { image: "php:8.2-fpm-alpine", workdir: "/var/www/html", build: "RUN docker-php-ext-install pdo pdo_mysql", cmd: '["php-fpm"]' },
  java: { image: "eclipse-temurin:21-jre-alpine", workdir: "/app", build: "COPY target/*.jar app.jar", cmd: '["java", "-jar", "app.jar"]' },
  rust: { image: "rust:1.75-alpine", workdir: "/app", build: "RUN cargo build --release", cmd: '["./target/release/app"]' },
};

const generateDockerfile = (cfg) => {
  const rt = RUNTIMES[cfg.runtime];
  const portExpose = cfg.port ? `EXPOSE ${cfg.port}` : "";
  const envLines = cfg.envVars
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `ENV ${l}`)
    .join("\n");

  return `FROM ${rt.image}

WORKDIR ${rt.workdir}

COPY . .

${rt.build}

${envLines ? envLines + "\n" : ""}${portExpose}

CMD ${rt.cmd}`;
};

const generateCompose = (cfg) => {
  const rt = RUNTIMES[cfg.runtime];
  const ports = cfg.port ? `\n    ports:\n      - "${cfg.port}:${cfg.port}"` : "";
  const volumes = cfg.volumes
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean)
    .map((v) => `      - ${v}`)
    .join("\n");
  const volumeBlock = volumes ? `\n    volumes:\n${volumes}` : "";

  const envVars = cfg.envVars
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `      - ${l}`)
    .join("\n");
  const envBlock = envVars ? `\n    environment:\n${envVars}` : "";

  const restartPolicy = cfg.restart ? `\n    restart: unless-stopped` : "";

  return `services:
  ${cfg.serviceName || "app"}:
    build: .
    image: ${cfg.imageName || cfg.serviceName || "app"}:latest${ports}${volumeBlock}${envBlock}${restartPolicy}
`;
};

const DockerizeHelper = () => {
  const [config, setConfig] = useState({
    runtime: "node",
    serviceName: "app",
    imageName: "myapp",
    port: "3000",
    volumes: "./data:/app/data",
    envVars: "NODE_ENV=production",
    restart: true,
  });
  const [dockerfile, setDockerfile] = useState("");
  const [compose, setCompose] = useState("");

  const update = (key, val) => setConfig((prev) => ({ ...prev, [key]: val }));

  const handleGenerate = () => {
    setDockerfile(generateDockerfile(config));
    setCompose(generateCompose(config));
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Dockerize Helper" helper="Generate Dockerfile + docker-compose.yml for your project" />
        <div className="space-y-4 mt-4">
          <MySelect label="Runtime" value={config.runtime} onChange={(v) => update("runtime", v)}>
            {Object.keys(RUNTIMES).map((r) => (
              <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
            ))}
          </MySelect>
          <MyInput label="Service Name" value={config.serviceName} onChange={(v) => update("serviceName", v)} placeholder="app" />
          <MyInput label="Image Name" value={config.imageName} onChange={(v) => update("imageName", v)} placeholder="myapp" />
          <MyInput label="Port" type="number" value={config.port} onChange={(v) => update("port", v)} placeholder="3000" />
          <div>
            <label className="block text-sm font-medium mb-1">Volumes (one per line)</label>
            <textarea
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-secondary text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              value={config.volumes}
              onChange={(e) => update("volumes", e.target.value)}
              placeholder="./data:/app/data"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Environment Variables (KEY=value, one per line)</label>
            <textarea
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-secondary text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              value={config.envVars}
              onChange={(e) => update("envVars", e.target.value)}
              placeholder="NODE_ENV=production"
            />
          </div>
          <MySwitch label="Restart Unless Stopped" checked={config.restart} onChange={(v) => update("restart", v)} />
          <MyButton onClick={handleGenerate} className="w-full">Generate Files</MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Dockerfile and docker-compose.yml" />
        <div className="mt-4">
          <MyTabs>
            <MyTabs.Tab title="Dockerfile">
              <CodeOutput output={dockerfile} language="dockerfile" />
            </MyTabs.Tab>
            <MyTabs.Tab title="docker-compose.yml">
              <CodeOutput output={compose} language="yaml" />
            </MyTabs.Tab>
          </MyTabs>
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

DockerizeHelper.title = "Dockerize helper";
export default DockerizeHelper;
