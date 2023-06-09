import { getSession } from "next-auth/react";
import { MongoClient, ObjectId } from "mongodb";

export default function AdminPage({ isAdmin }) {
  if (!isAdmin) {
    return <p>You do not have access to this page</p>;
  }

  return <p>Admin page content here</p>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db();

  const user = await db.collection("users").findOne({
    _id: new ObjectId(session.user.id),
  });

  const isAdmin = user && user.admin;
  console.log(user);
  client.close();

  return {
    props: { isAdmin },
  };
}
