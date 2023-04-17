import MainBar from '@/components/FrontModules/appbar'
import '@/styles/globals.css'
import { Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { orange, teal } from "@mui/material/colors";
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import './i18n';
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



function App({ Component, pageProps }) {
  return(<ThemeProvider theme={theme}> 
            <CssBaseline>
              <MainBar/>
              <Paper className="content">
              <Component  {...pageProps} />     
              </Paper>
          </CssBaseline>
        </ThemeProvider>
      )
}
export default appWithTranslation(App, nextI18NextConfig);