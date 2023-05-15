import { useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";

export async function getServerSideProps({ req }) {
  const apiKey = process.env.IPSTACK_API_KEY;
  const requestIp = req.connection.remoteAddress;
  console.log("ip", requestIp);
  const response = await fetch(
    `http://api.ipstack.com/${requestIp}?access_key=${apiKey}`
  );
  const data = await response.json();

  return {
    props: {
      requestHeaders: req.headers,
      requestMethod: req.method,
      requestUrl: req.url,
      requestIp: req.connection.remoteAddress,
      requestUserAgent: req.headers["user-agent"],
      location: data,
    },
  };
}

export default function HomePage({
  requestHeaders,
  requestIp,
  requestMethod,
  requestUserAgent,
  requestUrl,
  location,
}) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  useEffect(() => {
    console.log("User request headers:", requestHeaders);
    console.log("User request method:", requestMethod);
    console.log("User request URL:", requestUrl);
    console.log("User IP address:", requestIp);
    console.log("User agent:", requestUserAgent);
  }, [requestHeaders, requestMethod, requestUrl, requestIp, requestUserAgent]);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      setLatitude(location.latitude);
      setLongitude(location.longitude);
    }
  }, [location]);

  return (
    <div>
      <Grid container direction="column" spacing={16}>
        <Grid item xs={8}>
          <Typography variant="h4">Get doxed lmao</Typography>
        </Grid>{" "}
        <Grid item xs={8}>
          <Typography>Headers: {JSON.stringify(requestHeaders)}</Typography>
          <Typography>Method: {requestMethod}</Typography>
          <Typography>URL: {requestUrl}</Typography>
          <Typography>IP Address: {requestIp}</Typography>
          <Typography>User Agent: {requestUserAgent}</Typography>
          {latitude && longitude && (
            <Typography>
              Position: {latitude}, {longitude}
            </Typography>
          )}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="caption">
            This is only clientside, nothing is sent to the server, i do not
            know any informations about this, this happens on your side.{" "}
          </Typography>
        </Grid>{" "}
      </Grid>
    </div>
  );
}
