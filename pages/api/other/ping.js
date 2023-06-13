import ping from "ping";

export default async function handler(req, res) {
  const { ip } = req.query;

  try {
    const result = await ping.promise.probe(ip);
    res.status(200).json({ time: result.time });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while pinging the IP address." });
  }
}
