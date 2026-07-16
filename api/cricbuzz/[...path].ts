// api/cricbuzz/[...path].ts
export default async function handler(req: any, res: any) {
  const { path, ...query } = req.query;
  const segments = Array.isArray(path) ? path.join("/") : path;

  const url = new URL(`https://cricbuzz-cricket.p.rapidapi.com/${segments}`);
  Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const keys = (process.env.RAPIDAPI_KEYS ?? "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  if (keys.length === 0) {
    return res.status(500).json({ error: "No RAPIDAPI_KEYS configured" });
  }

  let lastStatus = 500;

  for (const key of keys) {
    const upstream = await fetch(url.toString(), {
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    });

    if (upstream.status !== 429 && upstream.status !== 403) {
      const contentType = upstream.headers.get("content-type") ?? "application/json";
      res.setHeader("Content-Type", contentType);
      const buffer = Buffer.from(await upstream.arrayBuffer());
      return res.status(upstream.status).send(buffer);
    }

    lastStatus = upstream.status; // this key is rate-limited, try the next one
  }

  return res.status(lastStatus).json({ error: "All RapidAPI keys exhausted their quota" });
}