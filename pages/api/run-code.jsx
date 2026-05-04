import axios from "axios";
import PROGRAMMING_LANGUAGES from "@constants/programming_languages";

// --- Rate Limiter Setup ---
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

const rateLimit = (ip) => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

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
  const ip = req.headers["x-forwarded-for"] || req.connection?.remoteAddress || "unknown";
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const { code, language, theme, stdin } = req.body;

  // 2. Input Validation
  if (code && code.length > 50000) {
    return res.status(400).json({ error: "Code payload too large. Maximum 50000 characters allowed." });
  }
  if (stdin && stdin.length > 10000) {
    return res.status(400).json({ error: "Stdin payload too large. Maximum 10000 characters allowed." });
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
          stdin,
        },
      };
    }

    const { data } = await axios.post(
      "https://onecompiler.com/api/code/exec",
      formData,
      {
        headers: {
          Authorization: "Bearer " + process.env.ONE_COMPILER_API_KEY,
        },
      },
    );

    delete data.job;

    if ((language === "html" || theme === "html") && data.stdout) {
      const url = `https://app.onecompiler.com/${data.stdout}`;

      const { data: htmlData } = await axios.get(url);

      data.stdout = htmlData;
    }

    return res.status(200).json(data);
  } catch (error) {
    const errors = [];

    if (error.response) {
      errors.push(new Error(`HTTP Error: ${error.response.status}`));
    } else {
      errors.push(new Error(`Network Error: ${error.message}`));
    }

    return res.status(500).json({ errors });
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
