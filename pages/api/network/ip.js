import axios from "axios";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const customQuery = typeof req.query.query === "string" ? req.query.query.trim() : "";
    let target = customQuery;

    if (!target) {
      const rawIp = req.headers["x-forwarded-for"];
      const clientIp = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : (req.socket?.remoteAddress || "");
      // Clean IPv6 mapped IPv4 like ::ffff:127.0.0.1
      target = clientIp.replace(/^::ffff:/, "");
    }

    // Check if target is a private / localhost IP
    const isLocal =
      !target ||
      target === "127.0.0.1" ||
      target === "::1" ||
      target === "localhost" ||
      /^10\./.test(target) ||
      /^192\.168\./.test(target) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(target);

    // If local and no query was requested, fetch client public IP from external service
    const endpoint = customQuery
      ? `https://ipapi.co/${encodeURIComponent(customQuery)}/json/`
      : isLocal
        ? `https://ipapi.co/json/`
        : `https://ipapi.co/${encodeURIComponent(target)}/json/`;

    const { data } = await axios.get(endpoint, {
      timeout: 8000,
      headers: { "User-Agent": "devtoolkit/1.0" },
    });

    if (data.error) {
      // Fallback to ip-api.com
      const fallbackTarget = customQuery || "";
      const fallbackRes = await axios.get(`http://ip-api.com/json/${fallbackTarget}`, { timeout: 8000 });
      const f = fallbackRes.data;
      if (f.status === "fail") {
        return res.status(400).json({ error: f.message || "Failed to lookup IP info" });
      }
      return res.status(200).json({
        ip: f.query,
        city: f.city,
        region: f.regionName,
        country: f.country,
        countryCode: f.countryCode,
        postal: f.zip,
        latitude: f.lat,
        longitude: f.lon,
        timezone: f.timezone,
        org: f.org || f.as,
        asn: f.as,
        hostname: f.reverse || "",
      });
    }

    return res.status(200).json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      countryCode: data.country_code,
      postal: data.postal,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      org: data.org,
      asn: data.asn,
      hostname: data.hostname || "",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.response?.data?.reason || error.message || "Failed to retrieve IP information",
    });
  }
};

export default handler;

