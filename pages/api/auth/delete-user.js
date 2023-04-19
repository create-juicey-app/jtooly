// pages/api/delete-user.js
import { getSession } from "next-auth/react";
import { MongoClient } from "mongodb";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { userId } = req.body;

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const collection = client.db().collection("test.users");
    await collection.deleteOne({ email: session.user.email });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error deleting user" });
  } finally {
    await client.close();
  }
};
