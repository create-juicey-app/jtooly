import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function checkifadmin(req, res) {
  console.log("Checking if user is admin...");
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    console.log("User is not logged in");
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { email } = session.user;
  console.log("User email:", email);

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

    const usersCollection = client.db("test").collection("users");

    const user = await usersCollection.findOne({ email, admin: true });
    if (user) {
      console.log("User is admin");
      res.status(200).json({ isAdmin: true });
    } else {
      console.log("User is not admin");
      res.status(200).json({ isAdmin: false });
    }
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
