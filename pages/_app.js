import MainBar from '@/components/FrontModules/appbar'
import '@/styles/globals.css'
import { Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { palette } from '@mui/system';
export default function App({ Component, pageProps }) {
  const mdTheme = createTheme(palette.mode,"dark");
  return( <CssBaseline>
            <ThemeProvider theme={mdTheme}>
              <MainBar/>
              <Paper className="content">
              <Component  {...pageProps} />     
              </Paper>
            </ThemeProvider> 
          </CssBaseline>
        )
}
