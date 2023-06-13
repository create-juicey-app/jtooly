import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import PortraitIcon from "@mui/icons-material/Portrait";
import { useTheme } from "@mui/material/styles";
import { darken } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  Icon,
  Divider,
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  TextField,
  IconButton,
  Tooltip,
  Grow,
} from "@mui/material";
import { colors as muiColors } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { MongoClient } from "mongodb";
import { ColorLensRounded } from "@mui/icons-material";
export default function Profile({ user }) {
  const saveColor = async (color) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users/updateColor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color }),
      });

      if (!response.ok) {
        throw new Error("Failed to save color");
      }

      setIsLoading(false);
      closeDialogC();
      router.reload();
      console.log("Color saved successfully!");
      // Handle any additional logic or UI updates after saving the color
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.error("Error saving color:", error);
      // Handle error state or display error message to the user
    }
  };
  const handleColorSelect = (event, newColor) => {
    if (newColor !== null) {
      setSelectedColor(newColor);
    }
  };
  const rainbowColors = Object.keys(muiColors).sort((colorA, colorB) => {
    const order = [
      "red",
      "pink",
      "purple",
      "deepPurple",
      "indigo",
      "blue",
      "lightBlue",
      "cyan",
      "teal",
      "green",
      "lightGreen",
      "lime",
      "yellow",
      "amber",
      "orange",
      "deepOrange",
      "brown",
      "grey",
      "blueGrey",
    ];
    return order.indexOf(colorA) - order.indexOf(colorB);
  });
  const theme = useTheme();
  const paperBackgroundColor =
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.8)
      : darken(theme.palette.primary.dark, 0.9);
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpenC, setIsOpenC] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const openDialogC = () => setIsOpenC(true);
  const closeDialogC = () => setIsOpenC(false);
  console.log("ed", user);
  console.log("de", user?.name || "");
  const [ID, setID] = useState(user.id);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image);
  const router = useRouter();
  console.log(muiColors);
  return (
    <div>
      <form>
        <Card sx={{ maxWidth: 845 }}>
          <CardContent>
            <Typography
              sx={{ marginLeft: "50%", marginRight: "50%" }}
              gutterBottom
              variant="h4"
              component="div"
            >
              Settings
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <CardActionArea
                  onClick={openDialog}
                  sx={{
                    marginBottom: "10px",
                    width: 156,
                    height: 156,
                    borderRadius: "50%",
                  }}
                >
                  <Avatar
                    sx={{
                      marginBottom: "10px",
                      width: 156,
                      height: 156,
                    }}
                  />
                </CardActionArea>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  helperText="Enter your name"
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  helperText="Enter your email"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleSave(ID, name, email, image)}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
            <Tooltip title="Select favorite color">
              <IconButton
                onClick={openDialogC}
                variant="contained"
                color="primary"
              >
                <ColorLensRounded />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </form>

      <>
        <Dialog
          PaperProps={{
            style: { backgroundColor: paperBackgroundColor },
          }}
          open={isOpen}
          onClose={closeDialog}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: "28px",
              minHeight: "fit-content",
              minWidth: "400px",
              maxWidth: "800px",
            },
            "& .MuiDivider-root": { height: "1px" },
            "& .MuiSvgIcon-root": { fontSize: "24px" },
            "& .MuiDialogTitle-root": {
              paddingBottom: "16px",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
            "& .MuiDialogContent-root": {
              paddingBottom: "24px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "16px",
            },
            "& .MuiDialogActions-root": {
              paddingBottom: "24px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "8px",
            },
            "& .MuiButton-root": {
              paddingLeft: "24px",
              paddingRight: "24px",
              margin: "0 8px",
            },
            "& .MuiButton-containedPrimary": {
              backgroundColor: "#2196f3",
              "&:hover": { backgroundColor: "#1e88e5" },
            },
            "& .MuiButton-containedSecondary": {
              backgroundColor: "#f44336",
              "&:hover": { backgroundColor: "#e53935" },
            },
          }}
        >
          <DialogTitle sx={{ margin: "auto" }}>
            <Stack>
              <Icon
                sx={{ margin: "auto", marginBottom: "12px", marginTop: "18px" }}
              >
                <PortraitIcon color="primary" />
              </Icon>
              <Typography variant="h5">Select image method</Typography>
            </Stack>
          </DialogTitle>

          <DialogContent
            sx={{
              marginLeft: "18px",
              marginRight: "18px",
              marginBottom: "18px",
            }}
          >
            <Stack>
              <Typography variant="body1">
                Please select a method for modifying your image:
              </Typography>
              <Divider />
              <br />
              <Grid container>
                <Grid item xs>
                  <Stack sx={{ position: "relative" }}>
                    <Typography>Upload an image to the website</Typography>
                    <Button variant="outlined">Upload</Button>
                  </Stack>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs>
                  <Stack sx={{ position: "relative" }}>
                    <Typography>Upload an image through a link</Typography>
                    <Button variant="outlined">Upload</Button>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>

          <Divider variant="middle" />

          <DialogActions sx={{ marginTop: "18px", marginBottom: "18px" }}>
            <Button
              sx={{ borderRadius: "28px" }}
              onClick={closeDialogC}
              size="large"
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
      <>
        <Dialog
          TransitionComponent={Grow}
          PaperProps={{
            style: { backgroundColor: paperBackgroundColor },
          }}
          open={isOpenC}
          onClose={closeDialogC}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: "28px",
              minHeight: "fit-content",
              minWidth: "50px",
              maxWidth: "1000px",
            },
            "& .MuiDivider-root": { height: "1px" },
            "& .MuiSvgIcon-root": { fontSize: "24px" },
            "& .MuiDialogTitle-root": {
              paddingBottom: "16px",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
            "& .MuiDialogContent-root": {
              paddingBottom: "24px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "16px",
            },
            "& .MuiDialogActions-root": {
              paddingBottom: "24px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "8px",
            },
            "& .MuiButton-root": {
              paddingLeft: "24px",
              paddingRight: "24px",
              margin: "0 8px",
            },
            "& .MuiButton-containedPrimary": {
              backgroundColor: "#2196f3",
              "&:hover": { backgroundColor: "#1e88e5" },
            },
            "& .MuiButton-containedSecondary": {
              backgroundColor: "#f44336",
              "&:hover": { backgroundColor: "#e53935" },
            },
          }}
        >
          <DialogTitle sx={{ margin: "auto" }}>
            <Stack>
              <Icon
                sx={{
                  margin: "auto",
                  marginBottom: "12px",
                  marginTop: "18px",
                }}
              >
                <PortraitIcon color="primary" />
              </Icon>
              <Typography variant="h5">Select Favorite Color</Typography>
            </Stack>
          </DialogTitle>

          <DialogContent
            sx={{
              marginLeft: "18px",
              marginRight: "18px",
              marginBottom: "18px",
            }}
          >
            <Stack>
              <Typography variant="body1">
                Please select your favorite color to customise your experience:
              </Typography>
              <Divider />
              <br />
              <ToggleButtonGroup
                value={selectedColor}
                exclusive
                onChange={handleColorSelect}
                sx={{ display: "flex", flexWrap: "wrap" }}
              >
                {rainbowColors.map(
                  (color) =>
                    color !== "common" && (
                      <ToggleButton
                        key={color}
                        value={color}
                        sx={{
                          color: muiColors[color].contrastText,
                          bgcolor:
                            selectedColor === color
                              ? muiColors[color][800]
                              : muiColors[color][500],
                          ":hover": {
                            bgcolor: muiColors[color][300],
                          },
                          "&.Mui-selected": {
                            bgcolor: muiColors[color][800],
                          },
                        }}
                      >
                        <Tooltip
                          title={color.charAt(0).toUpperCase() + color.slice(1)}
                          placement="top"
                        >
                          <ColorLensRounded />
                        </Tooltip>
                      </ToggleButton>
                    )
                )}
              </ToggleButtonGroup>
              {selectedColor && (
                <Typography sx={{ mt: 2 }}>
                  Currently selected color:{" "}
                  <strong>
                    {selectedColor.charAt(0).toUpperCase() +
                      selectedColor.slice(1)}
                  </strong>
                </Typography>
              )}
            </Stack>
          </DialogContent>

          <Divider variant="middle" />

          <DialogActions sx={{ marginTop: "18px", marginBottom: "18px" }}>
            <Button
              sx={{ borderRadius: "28px" }}
              onClick={closeDialogC}
              size="large"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              sx={{ borderRadius: "28px" }}
              onClick={() => saveColor(selectedColor)}
              size="large"
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
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
      router.reload();
    }

    return data;
  }
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
    const email = session.user.email;
    const name = session.user.name;
    const user = await usersCollection.findOne({
      $or: [{ email: email }, { name: name }],
    });
    console.log("user", user);
    const isOwn = user && (user.email === email || user.name === name);
    console.log(user);
    return {
      props: {
        user: isOwn
          ? {
              _id: user._id.toString(),
              email: user.email,
              name: user.name,
              image: user.image,
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
