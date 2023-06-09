import React, { Component } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
      showErrorDetails: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMessage: error.message };
  }

  toggleErrorDetails = () => {
    this.setState((prevState) => ({
      showErrorDetails: !prevState.showErrorDetails,
    }));
  };

  render() {
    const { hasError, errorMessage, showErrorDetails } = this.state;

    if (hasError) {
      return (
        <Box sx={{ width: "100%", marginTop: 2 }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={this.toggleErrorDetails}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Alert>
          <Collapse in={showErrorDetails} timeout="auto" unmountOnExit>
            <Alert severity="info">
              <AlertTitle>Error Details</AlertTitle>
              {this.props.children}
            </Alert>
          </Collapse>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
