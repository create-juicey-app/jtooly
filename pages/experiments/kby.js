import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

const SamuraiKirby = () => {
  const [gameState, setGameState] = useState("start");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [difficulty, setDifficulty] = useState("easy1");
  const difficultyTimeouts = {
    easy1: 2500,
    easy2: 2000,
    easy3: 1250,
    medium1: 1000,
    medium2: 750,
    medium3: 500,
    hard1: 250,
    hard2: 200,
    hard3: 100,
  };

  useEffect(() => {
    if (gameState === "waitForSignal") {
      const timeout =
        Math.random() *
          (difficulty === "easy1"
            ? 500
            : difficulty === "hard1"
            ? 2000
            : 4000) +
        1000;
      const timer = setTimeout(() => {
        setGameState("signal");
        setStartTime(Date.now());
      }, timeout);

      setTimerId(timer);

      return () => clearTimeout(timer);
    }
  }, [gameState, difficulty]);

  const handleKeyDown = () => {
    if (gameState === "signal") {
      const endTime = Date.now();
      setReactionTime(endTime - startTime);
      setGameState("result");
    }
  };

  useEffect(() => {
    if (gameState === "signal") {
      window.addEventListener("keydown", handleKeyDown);

      const timeoutValue = difficultyTimeouts[difficulty];
      const timeout = setTimeout(() => {
        setGameState("tooLate");
      }, timeoutValue);

      setTimerId(timeout);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timeout);
      };
    }
  }, [gameState]);

  const startGame = () => {
    setGameState("waitForSignal");
    setReactionTime(null);
  };

  const restartGame = () => {
    setGameState("start");
    setReactionTime(null);
    clearTimeout(timerId);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleNextEnemy = () => {
    const difficultyLevels = Object.keys(difficultyTimeouts);
    const currentIndex = difficultyLevels.indexOf(difficulty);
    const nextIndex = currentIndex + 1;

    if (nextIndex < difficultyLevels.length) {
      const nextDifficulty = difficultyLevels[nextIndex];
      setDifficulty(nextDifficulty);
      setGameState("waitForSignal");
      setReactionTime(null);
      clearTimeout(timerId);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {gameState === "start" && (
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select difficulty</FormLabel>
            <RadioGroup
              value={difficulty}
              onChange={handleDifficultyChange}
              row
            >
              <FormControlLabel
                value="easy1"
                control={<Radio />}
                label="Easy"
              />
              <FormControlLabel
                value="medium1"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel
                value="hard1"
                control={<Radio />}
                label="Hard"
              />
            </RadioGroup>
          </FormControl>
          <Button variant="contained" onClick={startGame}>
            Start
          </Button>
        </>
      )}

      {gameState === "waitForSignal" && (
        <Typography variant="h5">Wait for the signal...</Typography>
      )}

      {gameState === "signal" && (
        <Typography variant="h5">Press any key!</Typography>
      )}

      {gameState === "result" && (
        <>
          <Typography variant="h5">
            Your reaction time: {reactionTime} ms
          </Typography>
          {difficulty !== "hard3" ? (
            <Button
              variant="contained"
              onClick={() => setDifficulty(handleNextEnemy)}
            >
              Next enemy
            </Button>
          ) : (
            <Typography variant="h5">You have defeated all enemies!</Typography>
          )}
          <Button variant="contained" onClick={restartGame}>
            Play again
          </Button>
        </>
      )}

      {gameState === "tooLate" && (
        <>
          <Typography variant="h5">Too late, the enemy got you!</Typography>
          <Button variant="contained" onClick={restartGame}>
            Try again
          </Button>
        </>
      )}
    </Box>
  );
};
export default SamuraiKirby;
