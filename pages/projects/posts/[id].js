import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";
import { ObjectId } from "bson";

export default function PostComponent({ post }) {
  const router = useRouter();
  const isLoading = router.isFallback;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {post.title}
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {post.body}
      </Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Typography variant="body1">{post.body}</Typography>
      )}
    </Box>
  );
}

export async function getStaticPaths() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const collection = client.db("test").collection("posts");
  const posts = await collection.find({}, { _id: 1 }).toArray();
  client.close();

  const paths = posts.map((post) => ({
    params: { id: post._id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const collection = client.db("test").collection("posts");
  const post = await collection.findOne({ _id: new ObjectId(id) });
  client.close();

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
    revalidate: 1,
  };
}
