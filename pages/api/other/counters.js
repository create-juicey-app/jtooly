import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "public/counters.json");

export default (req, res) => {
  if (req.method === "GET") {
    try {
      const data = fs.readFileSync(filePath, "utf8");
      const counters = JSON.parse(data);
      res.status(200).json(counters);
    } catch (error) {
      console.error("Error reading counters from file:", error);
      res.status(500).json({ error: "Error reading counters from file" });
    }
  } else if (req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      const counters = JSON.parse(data);
      const newData = JSON.stringify(counters);

      try {
        fs.writeFileSync(filePath, newData, "utf8");
        res.status(200).end();
      } catch (error) {
        console.error("Error saving counters to file:", error);
        res.status(500).json({ error: "Error saving counters to file" });
      }
    });
  } else {
    res.status(404).end();
  }
};
