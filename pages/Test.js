import { MongoClient } from "mongodb";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Fab,
  Box,
  Card,
  Grid,
  Alert,
  Stack,
  Paper,
  Button,
  Dialog,
  Tooltip,
  Checkbox,
  Skeleton,
  Snackbar,
  TextField,
  CardMedia,
  Typography,
  IconButton,
  CardActions,
  CardContent,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
  DialogContentText,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CircularProgress from "@mui/material/LinearProgress";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocalPoliceRoundedIcon from "@mui/icons-material/LocalPoliceRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
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
    const serializedUsers = users.map((user) => ({
      ...user,
      _id: user._id.toString(),
      isAdmin: Boolean(user.admin),
    }));
    console.log(serializedUsers);
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
function handleOwnInfo() {
  console.log();
}

export default function Users({ users, isadmin }) {
  async function handleCheckAdmin(userId) {
    try {
      const res = await fetch(`/api/checkadmin?id=${userId}`);
      const { isAdmin } = await res.json();
      console.log("Finished handleCheckAdmin function");
      console.log("Admin :", isAdmin);
      return isAdmin;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  const handleSave = async () => {
    const updatedUser = {
      ...selectedUser,
      name,
      email,
      image,
    };

    // Declare cache to store visited objects
    const cache = [];

    // Remove circular references
    const replacer = (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.includes(value)) {
          return;
        }
        cache.push(value);
      }
      return value;
    };

    const body = JSON.stringify(updatedUser, replacer);

    try {
      const res = await fetch("/api/edituser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      handleClose();
    } catch (err) {
      console.error(err);
    }
  };
  async function handleDeleteUser(userId) {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/deleteuser?id=${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSnackbarMessage("User deleted successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        if (err.response && err.response.status === 403) {
          setSnackbarMessage("You do not have permission to delete this user.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        } else {
          setSnackbarMessage("Failed to delete user.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setSnackbarMessage("You do not have permission to delete this user.");
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("You cannot do that.");
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    } finally {
      setIsDeleting(false);
    }
  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { data } = useSession();
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const handleEdit = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setImage(user.image);
  };

  const handleuClose = () => {
    setSelectedUser(null);
    setName("");
    setEmail("");
    setImage("");
  };
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {users.map((user) => (
            <Card
              key={user._id}
              sx={{
                maxHeight: 345,
                maxWidth: 345,
                m: 2,
                position: "relative",
              }}
            >
              {isDeleting && ( // show CircularProgress when isDeleting is true
                <CircularProgress size={40} />
              )}
              <Paper elevation={3}>
                {isDeleting ? (
                  <Skeleton variant="rectangle" width={210} height={140} />
                ) : (
                  <CardMedia
                    component="img"
                    height="140"
                    width="210"
                    image={user.image}
                    alt={user.name}
                  />
                )}

                <CardContent>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {user.name}{" "}
                      {user.isAdmin && (
                        <Tooltip title="Administrator">
                          <LocalPoliceRoundedIcon />
                        </Tooltip>
                      )}
                    </Typography>
                  </Grid>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Stack>
                    <Typography variant="caption" color="text.secondary">
                      {user._id}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {user.isAdmin ? (
                      <Tooltip
                        followCursor
                        title="Cannot Modify this user since its an administrator"
                      >
                        <span>
                          <IconButton
                            color="primary"
                            variant="contained"
                            size="small"
                            disabled
                          >
                            <EditRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    ) : (
                      <Tooltip arrow title="Edit User">
                        <IconButton
                          color="primary"
                          variant="contained"
                          size="small"
                          onClick={() => handleEdit(user)}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {user.isAdmin ? (
                      <Tooltip
                        followCursor
                        title="Cannot Delete this user since its an administrator"
                      >
                        <span>
                          <IconButton
                            disabled
                            color="primary"
                            size="small"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <DeleteForeverRoundedIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    ) : (
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
                    )}
                  </Grid>
                </CardActions>
              </Paper>
              {/* Add circular progress and blur when isDeleting is true */}
              {isDeleting && (
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <CircularProgress color="primary" />
                </Box>
              )}
            </Card>
          ))}
        </Grid>
      </div>
      {selectedUser && (
        <Dialog open={true} onClose={handleuClose}>
          <DialogTitle>Edit user informations</DialogTitle>
          <DialogContent>
            <DialogContentText>Editing {selectedUser.name}</DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Username"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
            />
            <TextField
              margin="dense"
              id="image"
              label="Image URL"
              fullWidth
              value={image}
              variant="standard"
              onChange={(e) => setImage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleuClose}>Cancel</Button>
            <Button onClick={handleSave}>Apply</Button>
          </DialogActions>
        </Dialog>
      )}
      <Fab
        variant="extended"
        color="primary"
        onClick={handleOwnInfo}
        sx={{ position: "fixed", bottom: 0, right: 0, margin: "25px" }}
      >
        <ManageSearchRoundedIcon sx={{ mr: 1 }} />
        Check self infos
      </Fab>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
