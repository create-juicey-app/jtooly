import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if user is an admin by calling the API endpoint
    const isAdmin = await checkAdminStatus();

    if (isAdmin) {
      // Create the new post with created and modified timestamps
      const now = new Date().toISOString();
      const newPost = {
        title,
        content,
        body,
        createdAt: now,
        modifiedAt: now,
      };

      // Send a POST request to the server-side API endpoint
      const response = await fetch("/api/other/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        // Redirect to the newly created post page
        const { postId } = await response.json();
        router.push(`./${postId}`);
      } else {
        // Handle error response
        console.error("Failed to save post");
      }
    } else {
      // User is not an admin, handle the error or show a message
      console.log("User is not an admin");
    }

    setIsLoading(false);
  };

  const checkAdminStatus = async () => {
    const response = await fetch("/api/users/checkselfadmin");
    const isAdmin = await response.json();
    return isAdmin;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Create a New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </Button>
      </form>
    </Box>
  );
}
