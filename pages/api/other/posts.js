import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, createdAt, modifiedAt } = req.body;

    // Perform input validation if necessary

    try {
      const uri = process.env.MONGODB_URI;
      const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await client.connect();
      const db = client.db("test");

      // Insert the new post into the "posts" collection
      const result = await db.collection("posts").insertOne({
        title,
        content,
        createdAt,
        modifiedAt,
      });

      // Return the ID of the newly created post
      const postId = result.insertedId;

      client.close();

      res.status(201).json({ postId });
    } catch (error) {
      console.error("Failed to save post:", error);
      res.status(500).json({ error: "Failed to save post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
