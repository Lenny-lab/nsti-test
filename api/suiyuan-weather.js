module.exports = async function handler(req, res) {
  const key =
    process.env.AMAP_WEATHER_KEY ||
    process.env.SUIYUAN_AMAP_SERVER_KEY ||
    process.env.SUIYUAN_AMAP_KEY ||
    process.env.AMAP_KEY ||
    "57ce121e184c010bcd0d6b10c37fe30c";

  const city = typeof req.query.city === "string" && req.query.city.trim() ? req.query.city.trim() : "320106";

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=1800");

  if (!key) {
    res.status(500).json({
      status: "0",
      info: "missing weather key",
    });
    return;
  }

  try {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${encodeURIComponent(key)}&city=${encodeURIComponent(city)}&extensions=base`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    const live = data && data.lives && data.lives[0];

    if (!response.ok || !data || data.status !== "1" || !live) {
      res.status(502).json({
        status: "0",
        info: (data && data.info) || "weather service unavailable",
      });
      return;
    }

    res.status(200).json({
      status: "1",
      live: {
        city: live.city || "",
        weather: live.weather || "",
        temperature: live.temperature || "",
        reporttime: live.reporttime || "",
      },
    });
  } catch (error) {
    res.status(502).json({
      status: "0",
      info: "weather request failed",
    });
  }
};
