import net from "net";

const COMMON_PORT_SERVICES = {
  21: "FTP",
  22: "SSH",
  23: "Telnet",
  25: "SMTP",
  53: "DNS",
  80: "HTTP",
  110: "POP3",
  143: "IMAP",
  443: "HTTPS",
  465: "SMTPS",
  587: "SMTP (Submission)",
  993: "IMAPS",
  995: "POP3S",
  1433: "MSSQL",
  1521: "Oracle",
  3306: "MySQL",
  3389: "RDP",
  5432: "PostgreSQL",
  6379: "Redis",
  8080: "HTTP Alt",
  8443: "HTTPS Alt",
  27017: "MongoDB",
};

const checkPort = (host, port, timeoutMs = 2500) => {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();
    let settled = false;

    const finalize = (status) => {
      if (settled) return;
      settled = true;
      const rtt = Date.now() - start;
      socket.removeAllListeners();
      socket.destroy();
      resolve({
        port,
        service: COMMON_PORT_SERVICES[port] || "Unknown",
        status, // 'open' | 'closed' | 'filtered'
        rtt: status === "open" ? rtt : null,
      });
    };

    socket.setTimeout(timeoutMs);

    socket.on("connect", () => finalize("open"));
    socket.on("timeout", () => finalize("filtered"));
    socket.on("error", (err) => {
      // ECONNREFUSED typically means port is closed
      if (err.code === "ECONNREFUSED") {
        finalize("closed");
      } else {
        finalize("filtered");
      }
    });

    try {
      socket.connect(port, host);
    } catch {
      finalize("filtered");
    }
  });
};

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { host, ports } = req.body || {};

  if (!host || typeof host !== "string") {
    return res.status(400).json({ error: "Host is required" });
  }

  const cleanHost = host.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "").split(":")[0];

  // Block AWS / cloud metadata endpoint
  if (cleanHost === "169.254.169.254" || cleanHost === "metadata.google.internal") {
    return res.status(403).json({ error: "Target address not permitted" });
  }

  if (!Array.isArray(ports) || ports.length === 0) {
    return res.status(400).json({ error: "Ports must be a non-empty array" });
  }

  // Cap max ports per scan to 30 to prevent abuse
  const sanitizedPorts = ports
    .map((p) => parseInt(p, 10))
    .filter((p) => !isNaN(p) && p > 0 && p <= 65535)
    .slice(0, 30);

  if (sanitizedPorts.length === 0) {
    return res.status(400).json({ error: "No valid ports specified" });
  }

  try {
    // Run checks in parallel with concurrency batching
    const results = await Promise.all(
      sanitizedPorts.map((port) => checkPort(cleanHost, port)),
    );

    return res.status(200).json({
      host: cleanHost,
      scannedAt: new Date().toISOString(),
      results,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Port scan failed" });
  }
};

export default handler;

