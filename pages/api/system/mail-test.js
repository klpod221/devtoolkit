import net from "net";
import tls from "tls";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { host, port, useTls } = req.body || {};

  if (!host || typeof host !== "string") {
    return res.status(400).json({ error: "Host is required" });
  }

  const portNum = parseInt(port, 10);
  if (isNaN(portNum) || portNum <= 0 || portNum > 65535) {
    return res.status(400).json({ error: "Valid port number is required" });
  }

  const cleanHost = host.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "").split(":")[0];
  const isDirectTls = Boolean(useTls) || [465, 993, 995, 8443].includes(portNum);

  const start = Date.now();
  let settled = false;

  const promise = new Promise((resolve, reject) => {
    let socket;

    const cleanup = () => {
      if (socket) {
        socket.removeAllListeners();
        socket.destroy();
      }
    };

    const timeoutTimer = setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error("Connection timed out after 5000ms"));
    }, 5000);

    const onData = (chunk) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutTimer);
      const latency = Date.now() - start;
      const banner = chunk.toString("utf8").trim().slice(0, 500);
      cleanup();
      resolve({
        success: true,
        host: cleanHost,
        port: portNum,
        tls: isDirectTls,
        latency,
        banner,
      });
    };

    const onError = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutTimer);
      const latency = Date.now() - start;
      cleanup();
      resolve({
        success: false,
        host: cleanHost,
        port: portNum,
        tls: isDirectTls,
        latency,
        error: err.message,
      });
    };

    try {
      if (isDirectTls) {
        socket = tls.connect({
          host: cleanHost,
          port: portNum,
          rejectUnauthorized: false, // Allow self-signed test certs
        });
      } else {
        socket = net.createConnection({
          host: cleanHost,
          port: portNum,
        });
      }

      socket.once("data", onData);
      socket.once("error", onError);
    } catch (e) {
      onError(e);
    }
  });

  try {
    const result = await promise;
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      host: cleanHost,
      port: portNum,
      error: err.message,
    });
  }
};

export default handler;

