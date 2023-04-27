import { useState, useEffect } from "react";
import { Backdrop, CircularProgress, Paper } from "@mui/material";
import { orange, teal } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { appWithTranslation } from "next-i18next";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Router from "next/router";
import MainBar from "@/components/FrontModules/appbar";
import "../styles/globals.css";
import "./i18n";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
// Define your MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: orange[500],
    },
    secondary: {
      main: teal[500],
    },
    mode: "dark", // Default mode is "light"
  },
});

const StyledPaper = styled(Paper)({
  margin: "64px auto 0",
  maxWidth: "960px",
  padding: "24px",
});

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const [konamiCode, setKonamiCode] = useState("");

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  useEffect(() => {
    const konamiKeys = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    const wrongKonamiKeys = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "b",
      "a",
    ];
    let codeIndex = 0;

    function handleKeyDown(event) {
      const key = event.key;
      const expectedKey = konamiKeys[codeIndex];
      const wrongExpectedKey = wrongKonamiKeys[codeIndex];
      if (key === expectedKey || key === wrongExpectedKey) {
        codeIndex++;
        if (codeIndex === konamiKeys.length) {
          setKonamiCode("");
          if (key === expectedKey) {
            Router.push("/eastereggs/whopper");
          } else {
            Router.push("/eastereggs/getfreakingrickrolled");
          }
        }
      } else {
        setKonamiCode("");
        codeIndex = 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Analytics />
      <SessionProvider>
        <CssBaseline />
        <MainBar />
        <Paper
          variant="outlined"
          color="primary"
          square
          style={{ filter: isLoading ? "blur(8px)" : "none" }}
          className="content"
        >
          <Component {...pageProps} />
        </Paper>
        <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
