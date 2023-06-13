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
