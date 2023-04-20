import { MongoClient } from "mongodb";
import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Paper,
  Grid,
  Tooltip,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import LinearProgress from "@mui/material/LinearProgress";
////////////////////////////////////////////////////////////////////////////////

export async function getServerSideProps() {
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
    const collection = client.db("test").collection("users");
    const users = await collection.find().toArray();
    console.log(`Fetched ${users.length} users`);
    const serializedUsers = users.map((user) => {
      return {
        ...user,
        _id: user._id.toString(),
      };
    });
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

export default function Users({ users }) {
  async function handleDeleteUser(userId) {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/deleteuser?id=${userId}`, {
        method: "DELETE",
      });

      // handle the response as needed
    } catch (err) {
      // handle errors
    } finally {
      setIsDeleting(false);
    }
  }
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  function simulateProgress() {
    const totalProgress = 100;
    const timeLimit = 5000; // in milliseconds
    const interval = 100; // in milliseconds

    setProgress(0);

    const startTime = new Date().getTime();
    const intervalId = setInterval(() => {
      const elapsedTime = new Date().getTime() - startTime;
      const elapsedProgress = (elapsedTime / timeLimit) * totalProgress;

      if (elapsedProgress >= totalProgress) {
        setProgress(totalProgress);
        setTimeRemaining(0);
        clearInterval(intervalId);
      } else {
        setProgress(elapsedProgress);
        setTimeRemaining(Math.ceil((timeLimit - elapsedTime) / 1000));
      }
    }, interval);
  }
  function BeforeDelete(ID) {
    simulateProgress();
    handleDeleteUser(ID);
  }

  return (
    <div>
      <h1>Users:</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {users.map((user) => (
          <Card key={user._id} sx={{ maxWidth: 345, m: 2 }}>
            <Paper elevation={3}>
              <CardMedia
                component="img"
                height="140"
                image={user.image}
                alt={user.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user._id}
                </Typography>
                {isDeleting && (
                  <div>
                    <LinearProgress variant="determinate" value={progress} />
                    <p>Time remaining: {timeRemaining} seconds</p>
                  </div>
                )}
              </CardContent>
              <CardActions>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Tooltip arrow title="Edit User">
                    <IconButton
                      color="primary"
                      variant="contained"
                      size="small"
                      onClick={() => handleEditUser(user._id)}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow title="Delete User">
                    <IconButton
                      color="primary"
                      variant="outlined"
                      size="small"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <DeleteForeverRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </CardActions>
            </Paper>
          </Card>
        ))}
      </div>
    </div>
  );
}
