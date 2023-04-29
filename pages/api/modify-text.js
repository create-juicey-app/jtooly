import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { text, rvalue, percentage } = req.body; // add rvalue to the request body
        const uri = process.env.MONGODB_URI;
        const client = new MongoClient(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        await client.connect();
        const collection = client.db("test").collection("jrn");
        const result = await collection.updateOne({}, { $set: { text, rvalue, percentage } }); // add rvalue to the updated document
        client.close();

        res.status(200).json({ message: "Text updated successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update text" });
      }
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
