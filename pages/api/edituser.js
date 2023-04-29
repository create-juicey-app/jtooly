import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

const uri = process.env.MONGODB_URI;
let client;

export default async function handler(req, res) {
  try {
    // Check if the user is an admin


    // Proceed with updating the user
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB");
    const database = client.db("test");
    const users = database.collection("users");
    const { id, name, email, image } = req.body;
    console.log(id);
    const filter = { _id: ObjectId(id) };
    const options = { upsert: false };
    const updateDoc = {
      $set: { name, email, image },
    };
    const result = await users.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
    return res.status(200).json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    if (err.message.includes("requestAsyncStorage")) {
      return res.status(500).json({ success: false, message: "Error connecting to MongoDB: Request Async Storage not available" });
    }
    return res.status(500).json({ success: false, message: "Error connecting to MongoDB" });
  }
}
