import { MongoClient, ObjectId } from "mongodb";
import checkselfadmin from "./checkselfadmin";

const uri = process.env.MONGODB_URI;
let client;

export default async function handler(req, res) {
  try {
    // Check if the user is an admin
    const isAdmin = await checkselfadmin(req, res);
    console.log(isAdmin);
    if (!isAdmin) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Proceed with updating the user
    client = new MongoClient(uri, {
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

    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    res
      .status(500)
      .json({ success: false, message: "Error connecting to MongoDB" });
  } finally {
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
