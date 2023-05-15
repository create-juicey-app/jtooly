import { useRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const breadcrumbNameMap = {
  "/": "Home",
  "/users": "Users List",
  "/JRN": "About Me",
  "/eastereggs": "Request Finder",
  "/eastereggs/whopper": "Whopper World",
  "/eastereggs/getfreakingrickrolled": "Get Freaking Rickrolled",
  "/UNSAFEJRN": "About Me Editor",
  "/settings": "Profile Settings",
  "/YoutubeDownloader": "Youtube Downloader",
  "/dialogM3": " A Material Design 3 Dialog In MUI",
  "/users/[userId]": "A profile (cannot figure out how to get the users name)",
  // add more routes and their corresponding breadcrumb names here
};

export default function DynamicBreadcrumbs({ user }) {
  const router = useRouter();
  const pathnames = router.pathname.split("/").filter((x) => x);
  if (user) {
    breadcrumbNameMap["/[userId]"] = `${user.name}'s profile`;
  }
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {pathnames.length > 0 ? (
        <Link href="/" passHref>
          <Typography variant="subtitle1" color="textSecondary">
            Home
          </Typography>
        </Link>
      ) : (
        <Typography variant="subtitle1" color="textSecondary">
          Home
        </Typography>
      )}

      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const breadcrumbText = breadcrumbNameMap[to] || value;

        return last ? (
          <Typography variant="subtitle1" key={to}>
            {breadcrumbText}
          </Typography>
        ) : (
          <Link href={to} key={to} passHref>
            <Typography variant="subtitle1" color="textSecondary">
              {breadcrumbText}
            </Typography>
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
