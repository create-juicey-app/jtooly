import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import HelpIcon from "@mui/icons-material/Help";
export default function SignIn({ providers }) {
  const theme = useTheme();
  console.log(providers);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Typography component="h5" variant="body1">
          Would you like to sign in with one of these providers?
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1 }}>
          <>
            {Object.values(providers).map((provider) => (
              <Stack key={provider.name}>
                <Button
                  color="primary"
                  size="large"
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderRadius: "180px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                  onClick={() => signIn(provider.id)}
                  startIcon={
                    provider.name === "GitHub" ? (
                      <GitHubIcon />
                    ) : provider.name === "Google" ? (
                      <GoogleIcon />
                    ) : (
                      <HelpIcon />
                    )
                  }
                >
                  Sign in with {provider.name}
                </Button>
              </Stack>
            ))}
          </>
        </Box>
      </Box>
    </Container>
  );
}
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();
  console.log(providers);
  return {
    props: { providers: providers ?? [] },
  };
}
