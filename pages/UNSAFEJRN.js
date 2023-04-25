import { useState, useEffect } from "react";
import { MongoClient } from "mongodb";
import PropTypes from "prop-types";
import {
  TextField,
  Stack,
  Button,
  Typography,
  Fab,
  Rating,
  styled,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { green } from "@mui/material/colors";
const PASSWORD = "a";
export default function Home({ text, rrvalue }) {
  const [displayText, setDisplayText] = useState(text);
  const [inputText, setInputText] = useState(text);
  const [rvalue, setRvalue] = useState(rrvalue);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const StyledRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
      color: theme.palette.action.disabled,
    },
  }));
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: "Very Bad",
    },
    2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: "Bad",
    },
    3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: "Good",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: "Very Good",
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRatingChange = (event, newValue) => {
    setRvalue(newValue);
  };
  const handleAuthenticate = () => {
    if (password === PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleUpdateClick = async () => {
    setSuccess(false);
    setLoading(true);
    const response = await fetch("/api/modify-text", {
      method: "POST",
      body: JSON.stringify({ text: inputText, rvalue: rvalue }), // add rvalue to the request body
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.message === "Updated successfully") {
      setSuccess(true);
      setLoading(false);
      setDisplayText(inputText);
    } else {
      setSuccess(true);
      setLoading(false);
      console.log("Failed to update");
    }
  };

  return (
    <div>
      {!authenticated && (
        <div>
          <Grid>
            <Stack>
              <Typography variant="h5">
                This zone is password protected, this is temporary for a moment
                since nextauth is breaking and i dont know why
              </Typography>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Stack>

            <Button
              sx={{ bottom: 0 }}
              variant="contained"
              onClick={handleAuthenticate}
            >
              Authenticate
            </Button>
          </Grid>
        </div>
      )}
      {authenticated && (
        <div>
          <Box sx={{ m: 3, position: "fixed", bottom: 0, right: 0 }}>
            <Fab aria-label="save" color="primary" onClick={handleUpdateClick}>
              {success ? <CheckRoundedIcon /> : <SaveRoundedIcon />}
            </Fab>
            {loading && (
              <CircularProgress
                size={68}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: -6,
                  left: -6,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
          <TextField
            label="Text"
            value={inputText}
            onChange={handleInputChange}
          />

          <StyledRating
            name="highlight-selected-only"
            defaultValue={2}
            IconContainerComponent={IconContainer}
            value={rvalue}
            onChange={handleRatingChange}
            getLabelText={(rvalue) => customIcons[rvalue].label}
            highlightSelectedOnly
          />
          <Typography variant="h1">{displayText}</Typography>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const collection = client.db("test").collection("jrn");
  const result = await collection.findOne({});
  client.close();

  return { props: { text: result.text, rrvalue: result.rvalue } }; // add rvalue to the props object
}
