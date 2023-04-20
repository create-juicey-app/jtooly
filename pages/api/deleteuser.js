import { MongoClient, ObjectId } from "mongodb";

export default async function deleteOneUser(id) {
  console.log("probable ID:", id.query);
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
    const userId = ObjectId(id.query);

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
    const usersCollection = client.db("test").collection("users");
    const usersResult = await usersCollection.deleteOne({ _id: userId });
    console.log(`Deleted ${usersResult.deletedCount} user`);

    return usersResult.deletedCount;
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  } finally {
    // Ensures that the client will close when you finish/error
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
