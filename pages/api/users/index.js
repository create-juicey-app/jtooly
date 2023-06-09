import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
export default async function userlist(context) {
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
    const sessionsCollection = client.db("test").collection("sessions");

    const session = await getSession(context);
    const email = session?.user?.email;
    const name = session?.user?.name;
    console.log("sessions", session);
    const user = await usersCollection.findOne({
      $or: [{ email: email }, { name: name }],
    });
    console.log("user", user);

    let recentSessions = [];
    if (user) {
      recentSessions = await sessionsCollection
        .find({
          userId: user._id.toString(),
          expires: { $gt: new Date() },
        })
        .toArray();
      console.log("recentSessions", recentSessions);
    }
    const serializedUsers = (await usersCollection.find().toArray()).map(
      (user) => ({
        ...user,
        _id: user._id.toString(),
        isAdmin: Boolean(user.admin),
        isOwn: user.email === email || user.name === name,

        isConnected: recentSessions.some(
          (session) => session.userId.toString() === user._id.toString()
        ),
      })
    );

    console.log(serializedUsers);

    return { props: { users: serializedUsers } };
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    return { props: { users: [] } };
  } finally {
    // Ensures that the client will close when you finish/error
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
