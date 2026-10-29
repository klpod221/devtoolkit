import React, { useState, useEffect } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyCodeEditor from "@components/MyCodeEditor";
import CodeOutput from "@components/CodeOutput";

const parseDockerRun = (cmd) => {
  const trimmed = cmd.trim().replace(/\\\n/g, " ").replace(/\s+/g, " ");
  const args = trimmed.replace(/^docker\s+run\s*/i, "").trim();

  const service = {
    image: "",
    ports: [],
    volumes: [],
    environment: [],
    restart: "",
    name: "",
    networks: [],
  };

  const tokens = [];
  const regex = /(?:"[^"]*"|'[^']*'|\S)+/g;
  let match;
  while ((match = regex.exec(args)) !== null) {
    tokens.push(match[0].replace(/^['"]|['"]$/g, ""));
  }

  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    const next = tokens[i + 1];

    if ((t === "-p" || t === "--publish") && next !== undefined) {
      service.ports.push(next);
      i += 2;
    } else if (t.startsWith("--publish=")) {
      service.ports.push(t.split("=").slice(1).join("="));
      i++;
    } else if (t.startsWith("-p") && t.length > 2) {
      service.ports.push(t.slice(2));
      i++;
    } else if ((t === "-v" || t === "--volume") && next !== undefined) {
      service.volumes.push(next);
      i += 2;
    } else if (t.startsWith("--volume=")) {
      service.volumes.push(t.split("=").slice(1).join("="));
      i++;
    } else if (t.startsWith("-v") && t.length > 2) {
      service.volumes.push(t.slice(2));
      i++;
    } else if ((t === "-e" || t === "--env") && next !== undefined) {
      service.environment.push(next);
      i += 2;
    } else if (t.startsWith("--env=")) {
      service.environment.push(t.split("=").slice(1).join("="));
      i++;
    } else if (t.startsWith("-e") && t.length > 2) {
      service.environment.push(t.slice(2));
      i++;
    } else if (t === "--restart" && next !== undefined) {
      service.restart = next;
      i += 2;
    } else if (t.startsWith("--restart=")) {
      service.restart = t.split("=").slice(1).join("=");
      i++;
    } else if (t === "--name" && next !== undefined) {
      service.name = next;
      i += 2;
    } else if (t.startsWith("--name=")) {
      service.name = t.split("=").slice(1).join("=");
      i++;
    } else if (t === "--network" && next !== undefined) {
      service.networks.push(next);
      i += 2;
    } else if (t.startsWith("--network=")) {
      service.networks.push(t.split("=").slice(1).join("="));
      i++;
    } else if (!t.startsWith("-") && !service.image) {
      service.image = t;
      i++;
    } else {
      i++;
    }
  }

  if (!service.image) return "# Could not determine image name.";
  const svcName = service.name || service.image.replace(/[:/]/g, "_").split("_")[0];
  const lines = [`services:`, `  ${svcName}:`, `    image: ${service.image}`];
  if (service.name) lines.push(`    container_name: ${service.name}`);
  if (service.ports.length) { lines.push(`    ports:`); service.ports.forEach((p) => lines.push(`      - "${p}"`)); }
  if (service.volumes.length) { lines.push(`    volumes:`); service.volumes.forEach((v) => lines.push(`      - ${v}`)); }
  if (service.environment.length) { lines.push(`    environment:`); service.environment.forEach((e) => lines.push(`      - ${e}`)); }
  if (service.restart) lines.push(`    restart: ${service.restart}`);
  if (service.networks.length) { lines.push(`    networks:`); service.networks.forEach((n) => lines.push(`      - ${n}`)); }
  return lines.join("\n");
};

const DockerRunToCompose = () => {
  const [input, setInput] = useState("docker run -d --name myapp -p 80:3000 -v ./data:/app/data -e NODE_ENV=production --restart unless-stopped myorg/myapp:latest");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (input.trim()) setOutput(parseDockerRun(input));
    else setOutput("");
  }, [input]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Docker Run → Compose" helper="Paste a docker run command to convert to docker-compose.yml" />
        <MyCodeEditor language="shell" value={input} onChange={setInput} className="mt-4" />
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="docker-compose.yml" />
        <CodeOutput output={output} language="yaml" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

DockerRunToCompose.title = "Docker Run To Compose";
export default DockerRunToCompose;
