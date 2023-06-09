import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const uri = process.env.MONGODB_URI;
let client;

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      console.log("User is not logged in");
      res.status(401).json({ error: "You must be logged in to do this" });
      return;
    }
    console.log("Here comes the edit user");
    console.log(session);
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

    // Find the current user
    const currentUserName = session.user.name;
    const currentUser = await users.findOne({ name: currentUserName });

    // Check if the user's name or email from the collection is the same as the one in the session
    const isSameUser = currentUser.name === name || currentUser.email === email;

    // Check if the user is an admin
    const isAdmin = currentUser.admin === true;

    // If the user isn't the same and they are not an admin, refuse the modification
    if (!isSameUser && !isAdmin) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this user" });
    }

    // Check if the user being modified conflicts with another user
    const conflictingUser = await users.findOne({
      $and: [
        { _id: { $ne: ObjectId(id) } },
        { $or: [{ name: name }, { email: email }] },
      ],
    });

    if (conflictingUser) {
      return res.status(409).json({
        error: "Another user with the same name or email already exists",
      });
    }

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
    return res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    if (err.message.includes("requestAsyncStorage")) {
      return res.status(500).json({
        success: false,
        message:
          "Error connecting to MongoDB: Request Async Storage not available",
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Error connecting to MongoDB" });
  }
}
