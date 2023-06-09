import { MongoClient, ObjectId } from "mongodb";

export default async function checkifadmin(req, res) {
  console.log("probable ID:", req.query);
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
    const usersCollection = client.db("test").collection("users");

    // Search for a user with the given userId and admin=true
    const user = await usersCollection.findOne({ _id: userId, admin: true });

    // If a matching user is found, return true, otherwise, return false
    if (user) {
      console.log("is user admin? :", user.admin);
      res.status(200).json({ isAdmin: true });
    } else {
      console.log("is user admin? : False");
      res.status(200).json({ isAdmin: false });
    }
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Ensures that the client will close when you finish/error
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
