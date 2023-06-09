import { useEffect, useState } from "react";
import { Select, MenuItem, Typography } from "@mui/material";

const textSizes = [25, 50, 100, 200];

const generateRandomWords = (numWords) => {
  const words = [
    "cat",
    "dog",
    "hamster",
    "uh",
    "apple",
    "banana",
    "orange",
    "grape",
    "kiwi",
    "carrot",
    "potato",
    "tomato",
    "cucumber",
    "broccoli",
    "desk",
    "chair",
    "book",
    "pencil",
    "pen",
    "house",
    "car",
    "bicycle",
    "train",
    "bus",
  ];

  const randomWords = [];
  for (let i = 0; i < numWords; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
    randomWords.push("<br>");
  }

  return randomWords.join("");
};

export default function RandomWordsSelect() {
  const [selectedSize, setSelectedSize] = useState(textSizes[0]);
  const [randomWords, setRandomWords] = useState("");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  useEffect(() => {
    setRandomWords(generateRandomWords(selectedSize));
  }, [selectedSize]);

  return (
    <div>
      <Typography variant="subtitle1" fontWeight="bold">
        Select Number of Words:
      </Typography>
      <Select value={selectedSize} onChange={handleSizeChange}>
        {textSizes.map((size) => (
          <MenuItem key={size} value={size}>
            <Typography variant="subtitle1">{size}</Typography>
          </MenuItem>
        ))}
      </Select>
      <Typography variant="subtitle1" fontWeight="bold">
        Random Words:
      </Typography>
      <Typography
        variant="body1"
        sx={{ whiteSpace: "pre-line" }}
        dangerouslySetInnerHTML={{ __html: randomWords }}
      />
    </div>
  );
}
