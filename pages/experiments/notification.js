import { useState } from "react";
import {
  Box,
  Badge,
  Paper,
  IconButton,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemText,
  Button,
  ButtonGroup,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getSession } from "next-auth/react";

import MessageIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { MongoClient } from "mongodb";
import EngineeringIcon from "@mui/icons-material/Engineering";
/**
 * React component that displays a notification menu with different types of notifications.
 * @param {Array} notifications - Array of notification objects.
 * @returns {JSX.Element} - Returns the notification menu as a JSX element.
 */

const NotificationMenu = ({ notifications }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  async function discardNotification(notificationId) {
    const response = await fetch("/api/notifications/discard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notificationId }),
    });

    if (response.ok) {
      // Remove the discarded notification from the UI or refresh the page
    } else {
      // Show an error message
    }
  }
  const getMessageIcon = (type) => {
    switch (type) {
      case "message":
        return <MessageIcon color="primary" />;
      case "maintenance":
        return <EngineeringIcon color="error" />;
      case "like":
        return <FavoriteIcon color="primary" />;
      default:
        return null;
    }
  };

  // Create an object that maps each type to an array of notifications with that type
  const notificationsByType = {};
  notifications.forEach((notification) => {
    const type =
      notification.type.charAt(0).toUpperCase() +
      notification.type.slice(1) +
      "s";
    if (!notificationsByType[type]) {
      notificationsByType[type] = [];
    }
    notificationsByType[type].push(notification);
  });

  // Render each group of notifications separately
  return (
    <Box>
      <IconButton
        color="inherit"
        aria-controls="notifications-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            Notifications
          </Typography>
          <Paper elevation={3} sx={{ padding: 1 }}>
            {Object.entries(notificationsByType).map(
              ([type, notifications]) => (
                <Box key={type} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {type}
                  </Typography>
                  <Paper>
                    <List>
                      {notifications.map((notification) => (
                        <ListItem key={notification._id}>
                          <ButtonGroup variant="outlined">
                            <Button
                              fullWidth
                              onClick={handleClose}
                              startIcon={getMessageIcon(notification.type)}
                            >
                              <ListItemText
                                primary={notification.message}
                                secondary={notification.type}
                              />
                            </Button>
                            <Button
                              onClick={() => {
                                // Call the function to remove the notification from the database
                                // and update the notifications array
                                discardNotification(notification._id);
                              }}
                            >
                              <CloseIcon />
                            </Button>
                          </ButtonGroup>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Box>
              )
            )}
          </Paper>
        </Box>
      </Popover>
    </Box>
  );
};

export default NotificationMenu;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log("gay", session);
  if (!session) {
    return { props: { notifications: [] } }; // Return empty notifications array if the user is not signed in
  }

  const uri = process.env.MONGODB_URI;
  let client;
  try {
    console.log("Trying to connect to MongoDB...");
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const usersCollection = client.db("test").collection("users");
    const { email } = session.user;
    const usere = await usersCollection.findOne({ email });
    if (usere) {
    } else {
      console.log("User is not admin");
    }
    console.log("Connection Found, Connecting to MongoDB");
    await client.connect();
    console.log("Connected to MongoDB");
    const notificationsCollection = client
      .db("test")
      .collection("notifications");
    const notifications = await notificationsCollection
      .find({ recipientUserId: session.user })
      .toArray();
    // Convert object IDs to strings
    const serializedNotifications = notifications.map((notification) => ({
      id: notification._id.toString(),
      type: notification.type,
      message: notification.message,
      dismissedUsers: notification.dismissedUsers.map((id) => id.toString()),
    }));
    console.log(serializedNotifications);
    return { props: { notifications: serializedNotifications } };
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    return { props: { notifications: [] } };
  } finally {
    if (client) {
      console.log("Closing MongoDB connection...");
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}
