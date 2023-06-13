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
  CardActionArea,
  DialogContentText,
} from "@mui/material";
import { getSession } from "next-auth/react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import CircularProgress from "@mui/material/CircularProgress";
import LocalPoliceRoundedIcon from "@mui/icons-material/LocalPoliceRounded";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import Link from "next/link";
////////////////////////////////////////////////////////////////////////////////
/**
 * Retrieves user data from a MongoDB database and returns it as props for the page.
 * @async
 * @function getServerSideProps
 * @param {object} context - The Next.js context object.
 * @returns {object} - The props object containing an array of serialized user objects.
 * @throws {Error} - If there is an error connecting to the MongoDB database.
 */

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
    const sessionsCollection = client.db("test").collection("sessions");

    const session = await getSession(context);
    const email = session?.user?.email;
    const name = session?.user?.name;
    console.log("sessions", session);
    const user = await usersCollection.findOne({
      $or: [{ email: email }, { name: name }],
    });
    console.log("user", user);

    let recentSessions = [];
    if (user) {
      recentSessions = await sessionsCollection
        .find({
          userId: user._id.toString(),
          expires: { $gt: new Date() },
        })
        .toArray();
      console.log("recentSessions", recentSessions);
    }
    const serializedUsers = (await usersCollection.find().toArray()).map(
      (user) => ({
        ...user,
        _id: user._id.toString(),
        isAdmin: Boolean(user.admin),
        isOwn: user.email === email || user.name === name,

        isConnected: recentSessions.some(
          (session) => session.userId.toString() === user._id.toString()
        ),
      })
    );

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

/**
 * Renders a list of users with their information and actions to edit or delete them.
 * @param {Array} users - An array of user objects with their name, email, image, and isAdmin status.
 * @param {Boolean} isadmin - A boolean indicating whether the logged in user is an admin or not.
 * @returns {JSX.Element} - A React component that renders the list of users with their information and actions.
 */

export default function Users({ users, isadmin }) {
  function handleOwnInfo() {
    console.log("session2 infos", session2.data);
  }
  const session2 = useSession();
  const router = useRouter();
  async function handleCheckAdmin(userId) {
    try {
      const res = await fetch(`/api/users/checkadmin?id=${userId}`);
      const { isAdmin } = await res.json();
      console.log("Finished handleCheckAdmin function");
      console.log("Admin :", isAdmin);
      return isAdmin;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  useEffect(() => {
    /**
     * Asynchronously fetches the current user's admin status from the server and sets the authenticated state accordingly.
     * @returns {Promise<void>} A Promise that resolves once the authenticated state has been updated.
     */

    const fetchAdminStatus = async () => {
      setLoading(true);
      const res = await fetch("/api/users/checkselfadmin");
      const data = await res.json();
      setAuthenticated(data.isAdmin);
      setLoading(false);
    };

    fetchAdminStatus();
  }, []);
  async function handleSave(id, name, email, image) {
    console.log(id);
    const response = await fetch("/api/users/edituser", {
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
      setReloading(false);
      router.replace(router.pathname);
    }

    return data;
  }
  async function handleDeleteUser(userId) {
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/users/deleteuser?id=${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSnackbarMessage("User deleted successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setReloading(false);
        router.replace(router.pathname);
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
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState("false");
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
                    <CardActionArea>
                      <Link href={"users/" + user._id}>
                        <CardMedia
                          component="img"
                          height="140"
                          width="210"
                          image={user.image}
                          alt={user.name}
                        />
                      </Link>
                    </CardActionArea>
                  )}
                  {!loading ? (
                    <CardContent>
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography gutterBottom variant="h5" component="div">
                          <Link href={"users/" + user._id}>{user.name} </Link>
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
                          {user.isConnected && (
                            <Tooltip title="This user is active (has recently connected)">
                              <SpeedRoundedIcon />
                            </Tooltip>
                          )}
                        </Typography>
                      </Grid>
                      {authenticated && (
                        <Stack>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            {user._id}
                          </Typography>
                        </Stack>
                      )}
                    </CardContent>
                  ) : (
                    <CardContent>
                      <Typography>Loading user informations</Typography>
                      <CircularProgress
                        sx={{ marginLeft: "55px", marginRight: "55px" }}
                      />
                    </CardContent>
                  )}

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
