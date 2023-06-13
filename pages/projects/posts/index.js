import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { MongoClient } from "mongodb";
import Link from "next/link";
export default function PostsIndex({ posts }) {
  return (
    <Container>
      {posts.map((post) => (
        <Link href={`/projects/posts/${post._id}`}>
          <Card key={post._id} sx={{ marginTop: "1rem", cursor: "pointer" }}>
            <CardContent>
              <Typography variant="h4">{post.title}</Typography>
              <Typography variant="body1">{post.content}</Typography>
              <Divider middle></Divider>
              <Typography variant="caption">
                Created At: {new Date(post.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="caption">
                Updated At: {new Date(post.modifiedAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Container>
  );
}

export async function getServerSideProps() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const collection = client.db("test").collection("posts");
    const posts = await collection.find({}).toArray();

    const serializedPosts = posts.map((post) => {
      const serializedPost = { ...post };
      serializedPost._id = post._id.toString(); // Convert ObjectId to string
      return serializedPost;
    });

    return {
      props: { posts: serializedPosts },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { posts: [] },
    };
  } finally {
    client.close();
  }
}
