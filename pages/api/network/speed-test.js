export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};

const handler = async (req, res) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  if (req.method === "GET") {
    // Generate dummy payload for download speed test
    const size = Math.min(Math.max(parseInt(req.query.size, 10) || 1024 * 512, 1024), 5 * 1024 * 1024); // max 5MB
    const buffer = Buffer.alloc(size, "x");
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Length", size.toString());
    return res.status(200).send(buffer);
  }

  if (req.method === "POST") {
    // Acknowledge upload size
    let received = 0;
    if (typeof req.body === "string") {
      received = Buffer.byteLength(req.body);
    } else if (Buffer.isBuffer(req.body)) {
      received = req.body.length;
    } else if (req.body) {
      received = Buffer.byteLength(JSON.stringify(req.body));
    }
    return res.status(200).json({ received, timestamp: Date.now() });
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;

