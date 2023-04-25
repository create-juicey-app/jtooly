import { useState, useEffect } from "react";
import { MongoClient } from "mongodb";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
export default function Home({ text, rrvalue }) {
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

  return (
    <div>
      <p>{text}</p>
      {rrvalue}
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
