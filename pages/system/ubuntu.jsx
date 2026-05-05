import React, { useState } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MySwitch from "@components/MySwitch";
import CodeOutput from "@components/CodeOutput";

const generateScript = (cfg) => {
  const lines = ["#!/bin/bash", "set -euo pipefail", ""];

  lines.push("# ─── System Update ───────────────────────────────────────────────");
  lines.push("apt-get update && apt-get upgrade -y");
  lines.push("");

  if (cfg.timezone) {
    lines.push("# ─── Timezone ────────────────────────────────────────────────────");
    lines.push(`timedatectl set-timezone ${cfg.timezone}`);
    lines.push("");
  }

  if (cfg.username) {
    lines.push("# ─── Create User ─────────────────────────────────────────────────");
    lines.push(`useradd -m -s /bin/bash ${cfg.username}`);
    lines.push(`usermod -aG sudo ${cfg.username}`);
    lines.push(`echo '${cfg.username} ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers.d/90-cloud-init-users`);
    lines.push("");
  }

  if (cfg.sshKey) {
    lines.push("# ─── SSH Key ─────────────────────────────────────────────────────");
    const user = cfg.username || "ubuntu";
    lines.push(`mkdir -p /home/${user}/.ssh`);
    lines.push(`echo "${cfg.sshKey}" >> /home/${user}/.ssh/authorized_keys`);
    lines.push(`chmod 700 /home/${user}/.ssh && chmod 600 /home/${user}/.ssh/authorized_keys`);
    lines.push(`chown -R ${user}:${user} /home/${user}/.ssh`);
    lines.push("");
  }

  if (cfg.ufw) {
    lines.push("# ─── UFW Firewall ────────────────────────────────────────────────");
    lines.push("apt-get install -y ufw");
    lines.push("ufw default deny incoming");
    lines.push("ufw default allow outgoing");
    lines.push(`ufw allow ${cfg.sshPort || 22}/tcp`);
    if (cfg.allowHttp) lines.push("ufw allow 80/tcp");
    if (cfg.allowHttps) lines.push("ufw allow 443/tcp");
    lines.push("ufw --force enable");
    lines.push("");
  }

  if (cfg.sshHarden) {
    lines.push("# ─── SSH Hardening ───────────────────────────────────────────────");
    lines.push(`sed -i 's/#Port 22/Port ${cfg.sshPort || 22}/' /etc/ssh/sshd_config`);
    lines.push("sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config");
    lines.push("sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config");
    lines.push("systemctl restart sshd");
    lines.push("");
  }

  if (cfg.fail2ban) {
    lines.push("# ─── Fail2Ban ────────────────────────────────────────────────────");
    lines.push("apt-get install -y fail2ban");
    lines.push("systemctl enable fail2ban && systemctl start fail2ban");
    lines.push("");
  }

  if (cfg.docker) {
    lines.push("# ─── Docker ──────────────────────────────────────────────────────");
    lines.push("apt-get install -y ca-certificates curl gnupg");
    lines.push("install -m 0755 -d /etc/apt/keyrings");
    lines.push("curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg");
    lines.push('echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null');
    lines.push("apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin");
    if (cfg.username) lines.push(`usermod -aG docker ${cfg.username}`);
    lines.push("systemctl enable docker");
    lines.push("");
  }

  if (cfg.nginx) {
    lines.push("# ─── Nginx ───────────────────────────────────────────────────────");
    lines.push("apt-get install -y nginx");
    lines.push("systemctl enable nginx && systemctl start nginx");
    lines.push("");
  }

  lines.push('echo "✅ Server setup complete!"');
  return lines.join("\n");
};

const UbuntuServerConfigurator = () => {
  const [config, setConfig] = useState({
    username: "deploy",
    sshKey: "",
    timezone: "Asia/Ho_Chi_Minh",
    sshPort: "22",
    ufw: true,
    allowHttp: true,
    allowHttps: true,
    sshHarden: true,
    fail2ban: true,
    docker: false,
    nginx: false,
  });
  const [output, setOutput] = useState("");
  const update = (key, val) => setConfig((prev) => ({ ...prev, [key]: val }));

  const handleGenerate = () => setOutput(generateScript(config));

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Ubuntu Server Configurator" helper="Generate a setup shell script for a fresh Ubuntu server" />
        <div className="space-y-4 mt-4">
          <MyInput label="Admin Username" value={config.username} onChange={(v) => update("username", v)} placeholder="deploy" />
          <MySelect label="Timezone" value={config.timezone} onChange={(v) => update("timezone", v)}>
            <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
            <option value="Asia/Bangkok">Asia/Bangkok</option>
            <option value="Asia/Tokyo">Asia/Tokyo</option>
            <option value="Asia/Singapore">Asia/Singapore</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
          </MySelect>
          <MyInput label="SSH Key (public key)" value={config.sshKey} onChange={(v) => update("sshKey", v)} placeholder="ssh-rsa AAAA..." />
          <MyInput label="SSH Port" type="number" value={config.sshPort} onChange={(v) => update("sshPort", v)} />
          <MySwitch label="Enable UFW Firewall" checked={config.ufw} onChange={(v) => update("ufw", v)} />
          {config.ufw && (
            <>
              <MySwitch label="Allow HTTP (port 80)" checked={config.allowHttp} onChange={(v) => update("allowHttp", v)} />
              <MySwitch label="Allow HTTPS (port 443)" checked={config.allowHttps} onChange={(v) => update("allowHttps", v)} />
            </>
          )}
          <MySwitch label="Harden SSH Config" checked={config.sshHarden} onChange={(v) => update("sshHarden", v)} />
          <MySwitch label="Install Fail2Ban" checked={config.fail2ban} onChange={(v) => update("fail2ban", v)} />
          <MySwitch label="Install Docker" checked={config.docker} onChange={(v) => update("docker", v)} />
          <MySwitch label="Install Nginx" checked={config.nginx} onChange={(v) => update("nginx", v)} />
          <MyButton onClick={handleGenerate} className="w-full">Generate Script</MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="setup.sh — run as root on fresh server" />
        <CodeOutput output={output} language="bash" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

UbuntuServerConfigurator.title = "Ubuntu Server Configurator";
export default UbuntuServerConfigurator;
