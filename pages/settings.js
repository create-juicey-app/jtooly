import { useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

export default function Profile({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const router = useRouter();

  async function handleSave() {
    const response = await fetch("/api/edituser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        name,
        email,
        image,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    } else {
      router.reload();
    }

    return data;
  }

  return (
    <form>
      Name:
      <TextField>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </TextField>
      Email:
      <TextField>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </TextField>
      Image URL:
      <TextField>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </TextField>
      <Button type="button" onClick={handleSave}>
        Save Changes
      </Button>
    </form>
  );
}

export async function getServerSideProps(context) {
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

    const session = await getSession(context);
    const email = session?.user?.email;
    const name = session?.user?.name;
    console.log("sessions", session);
    const user = await usersCollection.findOne({
      $or: [{ email: email }, { name: name }],
    });
    console.log("user", user);

    const isOwn = user && (user.email === email || user.name === name);

    console.log("isOwn", isOwn);
    console.log(user);
    return {
      props: {
        user: isOwn
          ? {
              _id: user._id.toString(),
              email: user.email,
              name: user.name,
              isAdmin: Boolean(user.admin),
            }
          : null,
        isOwn,
      },
    };
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    return { props: { user: null, isOwn: false } };
  } finally {
    // Ensures that the client will close when you finish/error
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
