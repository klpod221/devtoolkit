import axios from "axios";

let cache = {};
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const base = ((req.query.base || "USD") + "").toUpperCase().trim();

  const cached = cache[base];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200");
    return res.status(200).json(cached.data);
  }

  try {
    let rates = null;

    if (process.env.FXRATES_API_KEY) {
      try {
        const { data } = await axios.get(
          `https://api.fxratesapi.com/latest?base=${base}&api_key=${process.env.FXRATES_API_KEY}`,
          { timeout: 5000 },
        );
        if (data && data.rates) {
          rates = data.rates;
        }
      } catch (err) {
        console.warn("FxRatesAPI failed, falling back to open exchange rate API:", err.message);
      }
    }

    if (!rates) {
      const { data } = await axios.get(
        `https://open.er-api.com/v6/latest/${base}`,
        { timeout: 5000 },
      );
      if (data && data.rates) {
        rates = data.rates;
      }
    }

    if (!rates) {
      throw new Error("Unable to fetch currency rates");
    }

    const responseData = { base, rates };
    cache[base] = { timestamp: Date.now(), data: responseData };

    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=7200");
    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to fetch rates" });
  }
}

