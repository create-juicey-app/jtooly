import { MongoClient, ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

export default async function deleteOneUser(req, res) {
  console.log("probable ID:", req.query.id);
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

    // Get the user's ID as an ObjectId
    const userId = ObjectId(req.query.id);

    // Check if the user is an admin
    const usersCollection = client.db("test").collection("users");
    const user = await usersCollection.findOne({ _id: userId });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    if (user.admin) {
      res.status(403).send("Cannot delete an admin user");
      return;
    }

    // Get the session
    const session = await getSession({ req });
    if (!session) {
      res.status(401).send("You must be logged in to delete a user");
      return;
    }

    // Check if the user performing the delete operation is an admin
    const userPerformingDelete = await usersCollection.findOne({
      email: session.user.email,
    });
    if (!userPerformingDelete || !userPerformingDelete.admin) {
      res.status(403).send("You must be an admin to delete a user");
      return;
    }

    // Delete the user's session from the sessions collection
    const sessionsCollection = client.db("test").collection("sessions");
    const sessionsResult = await sessionsCollection.deleteMany({ userId });
    console.log(
      `Deleted ${sessionsResult.deletedCount} sessions for user ${userId}`
    );

    // Delete the user's account from the accounts collection
    const accountsCollection = client.db("test").collection("accounts");
    const accountsResult = await accountsCollection.deleteOne({ userId });
    console.log(`Deleted ${accountsResult.deletedCount} account`);

    // Delete the user from the users collection
    const usersResult = await usersCollection.deleteOne({ _id: userId });
    console.log(`Deleted ${usersResult.deletedCount} user`);

    res.send(`Deleted ${usersResult.deletedCount} user`);
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    res.status(500).send("Error connecting to MongoDB");
  } finally {
    // Ensures that the client will close when you finish/error
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
