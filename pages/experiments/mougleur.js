import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function CounterPage() {
  const [Value, setValue] = useState(8);
  const [Value2, setValue2] = useState(3);
  const difference = Value - Value2;
  const percentagedifference = ((difference / Value) * 100).toFixed(2);
  const oiseauPercentage = (100 - percentagedifference).toFixed(2);

  return (
    <div>
      <Typography variant="h2">Animaux que mougli a deja tué </Typography>
      <Typography variant="h4">
        Souris : {Value} ou {percentagedifference}%
      </Typography>
      <Typography variant="h4">
        Oiseaux : {Value2} ou {oiseauPercentage}%
      </Typography>
      <Typography variant="h4">
        Mougli a tué en total : {Value + Value2} Animaux
      </Typography>
    </div>
  );
}
