import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { notificationId } = req.body;

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const notificationsCollection = client
      .db("test")
      .collection("notifications");

    await notificationsCollection.updateOne(
      { _id: new ObjectId(notificationId) },
      { $addToSet: { dismissedUsers: session.user.id } }
    );

    res.status(200).json({ message: "Notification discarded" });
  } catch (err) {
    res.status(500).json({ message: "Error discarding notification" });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
