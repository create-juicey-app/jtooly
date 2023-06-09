import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function checkColor(req, res) {
  console.log("Checking color");

  let favoriteColor = "orange"; // Set default color to "orange"
  let client = null; // Declare the client variable and initialize it to null

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      // User session is missing or disconnected
      console.log("no session ");
      return res.status(200).json({ favoriteColor: "orange" });
    }

    const { user } = session;
    const { name, email } = user;

    const uri = process.env.MONGODB_URI;
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("test");
    const users = database.collection("users");
    console.log("Retrieving current user");

    const currentUser = await users.findOne({
      name,
      email,
    });

    // Retrieve the color from the user document
    if (currentUser && currentUser.color) {
      favoriteColor = currentUser.color;
    }

    console.log(`Favorite color: ${favoriteColor}`);
    res.status(200).json({ favoriteColor });
  } catch (error) {
    console.error("Error retrieving user color:", error);
    res.status(500).json({ error: "Internal server error", favoriteColor });
  } finally {
    if (client !== null) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
