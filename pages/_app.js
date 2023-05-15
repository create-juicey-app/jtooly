import { useState, useEffect } from "react";
import { Backdrop, Box, CircularProgress, Paper } from "@mui/material";
import { orange, teal } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { appWithTranslation } from "next-i18next";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Router from "next/router";
import MainBar from "@/components/FrontModules/appbar";
import "../styles/globals.css";
import "./i18n";
import { lighten, darken } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import PropTypes from "prop-types";
import darkScrollbar from "@mui/material/darkScrollbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { PaletteMode, IconButton } from "@mui/material";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useScrollTrigger } from "@mui/material";
import Grow from "@mui/material/Grow";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
function ScrollTop(props) {
  const { children, window } = props;
  const onScroll = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const [showButton, setShowButton] = useState(false);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleClick = (event) => {};

  return (
    <Grow in={onScroll} style={{ transformOrigin: "0 1 1" }}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Grow>
  );
}

// Define your MUI theme
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function MyApp({ Component, pageProps, mode = PaletteMode }) {
  const [isOnline, setIsOnline] = useState(true);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const favcolor = orange;
  const theme = createTheme({
    palette: {
      primary: {
        main: favcolor[500],
        back: prefersDarkMode
          ? darken(favcolor[100], 0.9)
          : lighten(favcolor[400], 0.5),
      },
      secondary: {
        main: teal[500],
      },
      mode: prefersDarkMode ? "dark" : "light",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "180px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: prefersDarkMode
              ? darken(favcolor["500"], 0.9)
              : lighten(favcolor["300"], 0.8),
          },
        },
      },
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [konamiCode, setKonamiCode] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);

  const startAnimation = () => {
    setShowAnimation((current) => !current);
  };
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const toolbarStyle = {
    transition: "all 0.5s",
    transform: showAnimation ? "translateY(0)" : "translateY(-100%)",
    backgroundColor: "#f0f0f0", // Replace with your desired background color
  };
  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    // Check for keywords that indicate a low-end device
    if (
      /Android/.test(userAgent) &&
      /Mobile/.test(userAgent) &&
      !/Chrome/.test(userAgent)
    ) {
      setIsLowEnd(true);
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      const model = userAgent.match(/iPhone\s*([^\s]*)|iPad;\s*CPU\s*([^\s]*)/);
      if (model && model[1] && parseFloat(model[1]) < 8) {
        setIsLowEnd(true);
      }
    }
  }, []);
  useEffect(() => {
    const shouldShowAnimation = !localStorage.getItem("hasVisitedBefore");
    setShowAnimation(shouldShowAnimation);
    localStorage.setItem("hasVisitedBefore", true);
  }, []);
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
    const handleOffline = () => setIsOnline(false);
    const handleOnline = () => setIsOnline(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
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
  const [scrolled, setScrolled] = useState(false);

  function handleScroll() {
    setScrolled(window.pageYOffset > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <CssBaseline enableColorScheme />
        <MainBar style={toolbarStyle} />

        <Paper
          variant="outlined"
          color="primary"
          square
          style={{ filter: isLoading ? "blur(8px)" : "none" }}
          className="content"
          sx={{ backgroundColor: theme.palette.primary.back }}
        >
          <Snackbar open={!isOnline}>
            <Alert severity="error">
              You are offline. Please check your internet connection.
            </Alert>
          </Snackbar>
          {isLowEnd ? (
            <Snackbar open={true}>
              <Alert severity="warning">
                Your device is old, some part of the website may or may not
                work.
              </Alert>
            </Snackbar>
          ) : null}
          <Component {...pageProps} />
          <ScrollTop {...pageProps}>
            <Fab onClick={goToTop} size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </Paper>
        <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
