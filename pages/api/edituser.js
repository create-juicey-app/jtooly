import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { id, name, email, isAdmin } = req.body;

  const uri = process.env.MONGODB_URI;
  let client;
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");
    const collection = client.db("test").collection("users");
    console.log("old infos :", req.body);
    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          email,
          admin: isAdmin,
        },
      }
    );
    console.log("new infos:", collection);
    console.log("User updated successfully");

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Ensures that the client will close when you finish/error
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
