import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Paper,
  Typography,
  Fab,
  IconButton,
  Icon,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import { Close } from "@mui/icons-material";
import { darken, lighten } from "@mui/material/styles";
import FileCopyRoundedIcon from "@mui/icons-material/FileCopyRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
const CustomDialog = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [cisOpen, setcIsOpen] = useState(false);
  const opencode = () => setcIsOpen(true);
  const closecode = () => setcIsOpen(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const [isCopied, setIsCopied] = useState(false);
  const code = `
  import { Close } from "@mui/icons-material";
  import { useTheme } from "@mui/material/styles";
  import { darken } from "@mui/material/styles";
  import { lighten } from "@mui/material/styles";
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Stack,
    Paper,
    Typography,
    Icon,
    Divider,
  } from "@mui/material";
  import { useState } from "react";
  export default function CustomDialog() {
    const theme = useTheme();
    const paperBackgroundColor =
      theme.palette.mode === "light"
        ? lighten(theme.palette.primary.light, 0.8)
        : darken(theme.palette.primary.dark, 0.9);
  
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);
    return (
      <>
        <Button
          variant="contained"
          sx={{ borderRadius: "28px" }}
          onClick={openDialog}
        >
          Open Dialog
        </Button>
        <Dialog
          PaperProps={{
            style: { backgroundColor: paperBackgroundColor },
          }}
          open={isOpen}
          onClose={closeDialog}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: "28px",
              minHeight: "fit-content",
              minWidth: "280px",
              maxWidth: "560px",
            },
            "& .MuiDivider-root": { height: "1px" },
            "& .MuiSvgIcon-root": { fontSize: "24px" },
            "& .MuiDialogTitle-root": {
              paddingBottom: "16px",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
            "& .MuiDialogContent-root": {
              paddingBottom: "24px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "16px",
            },
            "& .MuiDialogActions-root": {
              paddingBottom: "24px",
              paddingLeft: "24px",
              paddingRight: "24px",
              paddingTop: "8px",
            },
            "& .MuiButton-root": {
              paddingLeft: "24px",
              paddingRight: "24px",
              margin: "0 8px",
            },
            "& .MuiButton-containedPrimary": {
              backgroundColor: "#2196f3",
              "&:hover": { backgroundColor: "#1e88e5" },
            },
            "& .MuiButton-containedSecondary": {
              backgroundColor: "#f44336",
              "&:hover": { backgroundColor: "#e53935" },
            },
          }}
        >
          <DialogTitle sx={{ margin: "auto" }}>
            <Stack>
              <Icon
                sx={{ margin: "auto", marginBottom: "12px", marginTop: "18px" }}
              >
                <Close color="primary" />
              </Icon>
              <Typography variant="h5">Dialog Title</Typography>
            </Stack>
          </DialogTitle>
  
          <DialogContent
            sx={{ marginLeft: "18px", marginRight: "18px", marginBottom: "18px" }}
          >
            <Typography variant="body1">Lorem ipsum dolor sit amet</Typography>
          </DialogContent>
  
          <Divider variant="middle" />
  
          <DialogActions sx={{ marginTop: "18px", marginBottom: "18px" }}>
            <Button
              sx={{ borderRadius: "28px" }}
              onClick={closeDialog}
              size="large"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              sx={{ borderRadius: "28px" }}
              onClick={closeDialog}
              size="large"
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  
  `;
  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
  };
  const paperBackgroundColor =
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.8)
      : darken(theme.palette.primary.dark, 0.9);

  const handleCopyLeave = () => setIsCopied(false);
  return (
    <>
      <Typography variant="h4">
        Material Design 3 (MD3) Dialog in pure MUI
      </Typography>
      <Button
        variant="contained"
        sx={{ borderRadius: "28px" }}
        onClick={openDialog}
      >
        Open Dialog
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={cisOpen}
        onClose={closecode}
        PaperProps={{
          style: { backgroundColor: paperBackgroundColor },
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "28px",
            minHeight: "fit-content",
            minWidth: "280px",
            maxWidth: "560px",
          },
          "& .MuiDivider-root": { height: "1px" },
          "& .MuiSvgIcon-root": { fontSize: "24px" },
          "& .MuiDialogTitle-root": {
            paddingBottom: "16px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
          "& .MuiDialogContent-root": {
            paddingBottom: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "16px",
          },
          "& .MuiDialogActions-root": {
            paddingBottom: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "8px",
          },
          "& .MuiButton-root": {
            paddingLeft: "24px",
            paddingRight: "24px",
            margin: "0 8px",
          },
          "& .MuiButton-containedPrimary": {
            backgroundColor: "#2196f3",
            "&:hover": { backgroundColor: "#1e88e5" },
          },
          "& .MuiButton-containedSecondary": {
            backgroundColor: "#f44336",
            "&:hover": { backgroundColor: "#e53935" },
          },
        }}
      >
        <DialogTitle sx={{ margin: "auto" }}>
          <Stack>
            <Icon
              sx={{ margin: "auto", marginBottom: "12px", marginTop: "18px" }}
            >
              <CodeIcon color="primary" />
            </Icon>
            <Typography variant="h5">Code Title</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent
          sx={{ marginLeft: "18px", marginRight: "18px", marginBottom: "18px" }}
        >
          <Paper sx={{ width: "100%" }}>
            <pre style={{ padding: "12px", position: "relative" }}>
              <code style={{ fontSize: "8px" }}>{code}</code>
              <IconButton
                size="small"
                onClick={handleCopyClick}
                onMouseLeave={handleCopyLeave}
                style={{ position: "absolute", top: "8px", right: "8px" }}
              >
                {isCopied ? (
                  <CheckCircleRoundedIcon color="success" />
                ) : (
                  <FileCopyRoundedIcon color="primary" />
                )}
              </IconButton>
            </pre>
          </Paper>
        </DialogContent>

        <Divider variant="middle" />

        <DialogActions sx={{ marginTop: "18px", marginBottom: "18px" }}>
          <Button
            sx={{ borderRadius: "28px" }}
            onClick={closecode}
            color="primary"
            size="large"
          >
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        PaperProps={{
          style: { backgroundColor: paperBackgroundColor },
        }}
        open={isOpen}
        onClose={closeDialog}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "28px",
            minHeight: "fit-content",
            minWidth: "280px",
            maxWidth: "560px",
          },
          "& .MuiDivider-root": { height: "1px" },
          "& .MuiSvgIcon-root": { fontSize: "24px" },
          "& .MuiDialogTitle-root": {
            paddingBottom: "16px",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },
          "& .MuiDialogContent-root": {
            paddingBottom: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "16px",
          },
          "& .MuiDialogActions-root": {
            paddingBottom: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "8px",
          },
          "& .MuiButton-root": {
            paddingLeft: "24px",
            paddingRight: "24px",
            margin: "0 8px",
          },
          "& .MuiButton-containedPrimary": {
            backgroundColor: "#2196f3",
            "&:hover": { backgroundColor: "#1e88e5" },
          },
          "& .MuiButton-containedSecondary": {
            backgroundColor: "#f44336",
            "&:hover": { backgroundColor: "#e53935" },
          },
        }}
      >
        <DialogTitle sx={{ margin: "auto" }}>
          <Stack>
            <Icon
              sx={{ margin: "auto", marginBottom: "12px", marginTop: "18px" }}
            >
              <Close color="primary" />
            </Icon>
            <Typography variant="h5">Dialog Title</Typography>
          </Stack>
        </DialogTitle>

        <DialogContent
          sx={{ marginLeft: "18px", marginRight: "18px", marginBottom: "18px" }}
        >
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </DialogContent>

        <Divider variant="middle" />

        <DialogActions sx={{ marginTop: "18px", marginBottom: "18px" }}>
          <Button
            sx={{ borderRadius: "28px" }}
            onClick={closeDialog}
            color="primary"
            size="large"
          >
            Cancel
          </Button>
          <Button
            sx={{ borderRadius: "28px" }}
            onClick={closeDialog}
            color="primary"
            size="large"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Fab
        onClick={opencode}
        sx={{ position: "fixed", bottom: "16px", right: "16px" }}
        variant="extended"
      >
        <CodeIcon sx={{ mr: 1 }} />
        Show Code
      </Fab>
    </>
  );
};

export default CustomDialog;
