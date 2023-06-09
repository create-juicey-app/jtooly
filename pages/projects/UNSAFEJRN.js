import { useState, useEffect } from "react";
import { MongoClient } from "mongodb";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {
  TextField,
  Stack,
  Button,
  Typography,
  Fab,
  Rating,
  styled,
  Box,
  ButtonGroup,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Link from "next/link";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Slider from "@mui/material/Slider";
import { green } from "@mui/material/colors";
export default function Home({ text, rrvalue, peer }) {
  const router = useRouter();
  const [displayText, setDisplayText] = useState(text);
  const [inputText, setInputText] = useState(text);
  const [rvalue, setRvalue] = useState(rrvalue);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [Percentage, setPercentage] = useState(peer);
  const [aloading, setaLoading] = useState(false);
  useEffect(() => {
    const fetchAdminStatus = async () => {
      setaLoading(true);
      const res = await fetch("/api/users/checkselfadmin");
      const data = await res.json();
      setAuthenticated(data.isAdmin);
      setaLoading(false);
    };

    fetchAdminStatus();
  }, []);
  useEffect(() => {
    let countdownTimer;
    if (!authenticated) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(countdownTimer);
      if (!authenticated && countdown === 1) {
        router.push("/projects/JRN");
      }
    };
  }, [authenticated, countdown, router]);
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
  const handlePercentageChange = (event) => {
    setPercentage(event.target.value);
  };
  const handleRatingChange = (event, newValue) => {
    setRvalue(newValue);
  };

  const handleUpdateClick = async () => {
    setSuccess(false);
    setLoading(true);
    const response = await fetch("/api/other/modify-text", {
      method: "POST",
      body: JSON.stringify({
        text: inputText,
        rvalue: rvalue,
        percentage: Percentage,
      }), // add rvalue to the request body
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
      setDisplayText(inputText);
      router.push("/projects/JRN");

      console.log("Failed to update");
    }
  };

  return (
    <div>
      {!authenticated && !aloading && (
        <Typography>
          You aren't an admin, returning in {countdown} seconds...
        </Typography>
      )}
      {aloading && (
        <CircularProgress
          size={68}
          sx={{
            color: "primary",
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-34px",
            marginLeft: "-34px",
          }}
        />
      )}
      {authenticated && !aloading && (
        <Box sx={{ width: "80vw" }}>
          <Paper elevation={2} sx={{ padding: 1.5 }}>
            <Stack
              direction="column"
              justifyContent="space-evenly"
              alignItems="stretch"
              spacing={4}
            >
              <Typography variant="h2">JRN</Typography>
              <Grid>
                <TextField
                  label="What im doing right now :"
                  variant="standard"
                  fullWidth
                  value={inputText}
                  onChange={handleInputChange}
                />
                <Box>
                  <Typography variant="caption" gutterBottom>
                    Percentage finished
                  </Typography>
                  <Slider
                    value={Percentage}
                    onChange={handlePercentageChange}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                  />
                </Box>
                <Grid>
                  <Typography component="legend">Current mood : </Typography>
                  <StyledRating
                    IconContainerComponent={IconContainer}
                    value={rvalue}
                    onChange={handleRatingChange}
                    getLabelText={(rvalue) => customIcons[rvalue].label}
                    highlightSelectedOnly
                  />
                </Grid>
              </Grid>

              <Box sx={{ m: 3, position: "fixed", bottom: 0, right: 0 }}>
                <Link href="/UNSAFEJRN"></Link>
              </Box>
              <Box sx={{ m: 3, position: "fixed", bottom: 0, right: 0 }}>
                <Fab
                  sx={{ margin: 2 }}
                  aria-label="save"
                  color="primary"
                  onClick={handleUpdateClick}
                >
                  {success ? <CheckRoundedIcon /> : <SaveRoundedIcon />}
                </Fab>
                {loading && (
                  <CircularProgress
                    size={68}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      margin: 2,
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
            </Stack>
          </Paper>
        </Box>
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

  return {
    props: {
      text: result.text,
      rrvalue: result.rvalue,
      peer: result.percentage,
    },
  }; // add rvalue to the props object
}
