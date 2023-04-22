import { MongoClient } from "mongodb";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
  Backdrop,
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
  DialogContentText,
} from "@mui/material";
import { getSession } from "next-auth/react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CircularProgress from "@mui/material/CircularProgress";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocalPoliceRoundedIcon from "@mui/icons-material/LocalPoliceRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
////////////////////////////////////////////////////////////////////////////////

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

    const collection = client.db("test").collection("users");

    const users = await collection.find().toArray();

    const session = await getSession(context);
    const email = session?.user?.email;
    const name = session?.user?.name;

    const serializedUsers = users.map((user) => ({
      ...user,
      _id: user._id.toString(),
      isAdmin: Boolean(user.admin),
      isOwn: user.email === email || user.name === name,
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

export default function Users({ users, isadmin }) {
  function handleOwnInfo() {
    console.log("session2 infos", session2.data);
  }
  const session2 = useSession();
  const router = useRouter();
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
  async function handleSave(id, name, email, image) {
    console.log(id);
    const response = await fetch("/api/edituser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name, email, image }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    } else {
      setSelectedUser(null);
      setReloading(true);
      router.reload();
    }

    return data;
  }
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
        setReloading(true);
        router.reload();
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
  const [reloading, setReloading] = useState(true);

  useEffect(() => {
    setReloading(false);
    // fetch data or call server-side props here
  }, []);
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
        {reloading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 108 }}
            open={true}
          >
            <CircularProgress disableshrink color="primary" />
          </Backdrop>
        ) : (
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
                        {user.isOwn && (
                          <Tooltip title="Its your account !">
                            <PersonRoundedIcon />
                          </Tooltip>
                        )}
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
                      background: "#66000000",
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
        )}
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
            <Button
              onClick={() => handleSave(selectedUser._id, name, email, image)}
            >
              Apply
            </Button>
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
