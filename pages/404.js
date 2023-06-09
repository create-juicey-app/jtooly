import * as React from "react";
import { Typography, ButtonGroup, Stack, Button } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import Link from "next/link";
import { useRouter } from "next/router";
function Error404() {
  const router = useRouter();
  return (
    <>
      <Stack spacing={2}>
        <Typography sx={{ top: 0 }} variant="h1">
          404
        </Typography>
        <Typography sx={{ position: "relative", top: 0 }} variant="h5">
          Are you lost?
        </Typography>
      </Stack>
      <ButtonGroup>
        <Button variant="outlined" size="large" endIcon={<HomeRoundedIcon />}>
          <Link href="/">Main menu</Link>
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={() => router.back()}
          startIcon={<UndoRoundedIcon />}
        >
          Go back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default function Err404() {
  return <Error404 />;
}
