import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";

const PingList = () => {
  const getRandomIP = () => {
    const range = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    const randomSegment = () => range(1, 254).toString().padStart(3, "0");
    return `${randomSegment()}.${randomSegment()}.${randomSegment()}.${randomSegment()}`;
  };

  const range = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const [ipQueue, setIPQueue] = useState([]);
  const [pingResults, setPingResults] = useState([]);
  const [isHacking, setIsHacking] = useState(false);

  const startHacking = () => {
    setIsHacking(true);
    addIPToQueue();
  };

  const stopHacking = () => {
    setIsHacking(false);
  };

  const addIPToQueue = () => {
    setIPQueue((prevQueue) => [...prevQueue, getRandomIP()]);
  };

  useEffect(() => {
    let timeout;

    const processNextIP = () => {
      if (ipQueue.length > 0) {
        const ip = ipQueue[0];
        let responseTime = Math.floor(Math.random() * 1000); // Generate a random response time between 0 and 1000 ms

        setPingResults((prevResults) => [
          ...prevResults,
          { ip, time: responseTime, status: "Hacking in progress..." },
        ]);
        setIPQueue((prevQueue) => prevQueue.slice(1));

        timeout = setTimeout(processNextIP, 1000); // Delay for 1 second before processing the next IP

        // Generate a new response time every 1 second
        setInterval(() => {
          responseTime = Math.floor(Math.random() * 1000);
          setPingResults((prevResults) =>
            prevResults.map((result) =>
              result.ip === ip ? { ...result, time: responseTime } : result
            )
          );
        }, 1000);

        if (ipQueue.length === 1) {
          const hackingFinishTimeout = range(8000, 10000); // Random delay between 8 and 10 seconds
          setTimeout(() => {
            setPingResults((prevResults) =>
              prevResults.map((result) =>
                result.ip === ip
                  ? { ...result, status: "Hacking Finished!" }
                  : result
              )
            );
            setIPQueue((prevQueue) => [...prevQueue, getRandomIP()]);
            stopHacking();
          }, hackingFinishTimeout);
        }
      }
    };

    if (isHacking && ipQueue.length > 0) {
      timeout = setTimeout(processNextIP, 1000); // Random delay between 1 and 3 seconds
    }

    return () => clearTimeout(timeout);
  }, [isHacking, ipQueue]);

  const handleStartHacking = () => {
    startHacking();
  };

  const handleStopHacking = () => {
    stopHacking();
    setIPQueue([]);
    setPingResults([]);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Fake Hacking Simulation
      </Typography>
      {isHacking ? (
        <Button variant="contained" onClick={handleStopHacking}>
          Stop Hacking
        </Button>
      ) : (
        <Button variant="contained" onClick={handleStartHacking}>
          Start Hacking
        </Button>
      )}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Currently checking IP: {pingResults.length}/
        {ipQueue.length + pingResults.length}
      </Typography>
      {pingResults.map((result, index) => (
        <div key={index} sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            IP: {result.ip}
          </Typography>
          <Typography variant="body1">
            Time: {result.time !== undefined ? result.time + " ms" : "Unknown"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: result.status === "Hacking Finished!" ? "green" : "gray",
              fontStyle: "italic",
            }}
          >
            {result.status}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default PingList;
