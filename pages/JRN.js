import { MongoClient } from "mongodb";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Link from "next/link"
import { Rating, Box, Tooltip, styled } from "@mui/material";
import Fab from '@mui/material/Fab';
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Typography } from "@mui/material";
import Brightness2RoundedIcon from '@mui/icons-material/Brightness2Rounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home({ text, rrvalue, peer }) {
  const [parisTime, setParisTime] = useState('');
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const updateParisTime = () => {
      const now = dayjs();
      setParisTime(now.tz('Europe/Paris').format('HH:mm:ss'));
      setIsNight(now.tz('Europe/Paris').isBefore(now.tz('Europe/Paris').set('hour', 6)) || now.tz('Europe/Paris').isAfter(now.tz('Europe/Paris').set('hour', 20)));
      animationFrameId = requestAnimationFrame(updateParisTime);
    };

    animationFrameId = requestAnimationFrame(updateParisTime);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const [prevParisTime, setPrevParisTime] = useState('');

  useEffect(() => {
    setPrevParisTime(parisTime);
  }, [parisTime]);
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }
  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };
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

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };
  return (
    <div>
      <Typography variant="h2">JRN</Typography>
      <Typography variant="h4">What im doing right now : {text} </Typography>
      <Typography variant="caption">Finished :</Typography><LinearProgressWithLabel value={peer} />
      <Typography variant="h5">Current mood :
        <StyledRating
          IconContainerComponent={IconContainer}
          value={rrvalue}
          readOnly
          getLabelText={(rvalue) => customIcons[rvalue].label}
          highlightSelectedOnly
        />
      </Typography>
      <Typography className={parisTime !== prevParisTime ? 'animate' : ''} variant="h5">Current time : {parisTime} {isNight ? <Tooltip title="Its currently night in my country"><Brightness2RoundedIcon /></Tooltip> : <Tooltip title="Its currently day in my country"><WbSunnyRoundedIcon /></Tooltip>}</Typography>

      <Box sx={{ m: 3, position: "fixed", bottom: 0, right: 0 }}>
        <Link href="/UNSAFEJRN">
          <Fab variant="extended" color="secondary" aria-label="edit">
            <EditIcon sx={{ mr: 1 }} /> Edit (ADMIN ONLY)
          </Fab>
        </Link>

      </Box>
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

  return { props: { text: result.text, rrvalue: result.rvalue, peer: result.percentage } }; // add rvalue to the props object
}
