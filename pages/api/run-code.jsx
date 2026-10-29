import axios from "axios";
import PROGRAMMING_LANGUAGES from "@constants/programming_languages";

// --- Rate Limiter Setup ---
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

const rateLimit = (ip) => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Periodic cleanup if map grows too large
  if (rateLimitMap.size > 2000) {
    for (const [key, timestamps] of rateLimitMap.entries()) {
      if (!timestamps || timestamps.length === 0 || timestamps[timestamps.length - 1] < windowStart) {
        rateLimitMap.delete(key);
      }
    }
  }

  const record = rateLimitMap.get(ip) || [];
  const requestsInWindow = record.filter((timestamp) => timestamp > windowStart);

  if (requestsInWindow.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limited
  }

  requestsInWindow.push(now);
  rateLimitMap.set(ip, requestsInWindow);
  return true;
};
// -------------------------

const post = async (req, res) => {
  // 1. Rate Limiting Check
  const rawIp = req.headers["x-forwarded-for"];
  const ip = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : (req.socket?.remoteAddress || "unknown");

  if (!rateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later.", stderr: "Rate limit exceeded (max 15 req/min)." });
  }

  const { code, language, theme, stdin } = req.body || {};

  // 2. Input Validation
  if (code && typeof code === "string" && code.length > 50000) {
    return res.status(400).json({ error: "Code payload too large. Maximum 50,000 characters allowed." });
  }
  if (stdin && typeof stdin === "string" && stdin.length > 10000) {
    return res.status(400).json({ error: "Stdin payload too large. Maximum 10,000 characters allowed." });
  }

  const selectedLanguage = PROGRAMMING_LANGUAGES.find(
    (lang) => lang.slug === language,
  );

  if (!selectedLanguage) {
    return res.status(400).json({ error: "Invalid language" });
  }

  if (!code) {
    return res.status(200).json({ stdout: null });
  }

  try {
    let formData;

    if (language === "html" || theme === "html") {
      const randomCode = Math.random().toString(36).substring(2, 11);

      formData = {
        properties: {
          language,
          files: [
            {
              name: "index.html",
              content: code,
            },
          ],
        },
        _id: randomCode,
      };
    } else {
      formData = {
        properties: {
          language,
          files: [
            {
              name: `main.${selectedLanguage.extension}`,
              content: code,
            },
          ],
          stdin: stdin || "",
        },
      };
    }

    const { data } = await axios.post(
      "https://onecompiler.com/api/code/exec",
      formData,
      {
        headers: {
          Authorization: "Bearer " + (process.env.ONE_COMPILER_API_KEY || ""),
        },
        timeout: 20000,
      },
    );

    if (data && typeof data === "object") {
      delete data.job;
    }

    if ((language === "html" || theme === "html") && typeof data?.stdout === "string") {
      const sanitizedSlug = data.stdout.replace(/[^a-zA-Z0-9_\-/]/g, "").replace(/^\/+/, "");
      if (sanitizedSlug) {
        const url = `https://app.onecompiler.com/${sanitizedSlug}`;
        const { data: htmlData } = await axios.get(url, { timeout: 10000 });
        data.stdout = htmlData;
      }
    }

    return res.status(200).json(data);
  } catch (error) {
    const errorMsg = error.response
      ? `Execution API Error: ${error.response.status} ${error.response.statusText || ""}`
      : `Network Error: ${error.message}`;

    return res.status(500).json({ error: errorMsg, stderr: errorMsg });
  }
};

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return post(req, res);
    default:
      return res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
