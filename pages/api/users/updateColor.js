import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res
        .status(401)
        .json({ error: "You must be logged in to do this" });
    }
    console.log("AGUUGZERGHZEQH GZEJKH FE", req.body);
    const { color } = req.body;
    if (!color) {
      return res.status(400).json({ error: "Color is required" });
    }

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const database = client.db("test");
    const users = database.collection("users");

    const currentUserName = session.user.name;
    const currentUser = await users.findOne({ name: currentUserName });

    const filter = { _id: ObjectId(currentUser._id) };
    const updateDoc = {
      $set: { color },
    };

    const result = await users.updateOne(filter, updateDoc);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );

    return res
      .status(200)
      .json({ success: true, message: "Color updated successfully" });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    return res
      .status(500)
      .json({ success: false, message: "Error connecting to MongoDB" });
  }
}
