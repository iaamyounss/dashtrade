import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AuthApp from 'Services/Auth/Route';
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import ExchangeContextProvider from "./Services/API/ExchangeContext";
import LoadingFullScreen from 'Helpers/LoadingFullScreen'

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#767676",
    },
    secondary: {
      main: "#E50914",
    },
  },
});

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ExchangeContextProvider>{children}</ExchangeContextProvider>
        </BrowserRouter>
    </ThemeProvider>
  )
};

const AppConsumer = () => {
  
  return (
    <Suspense fallback={<LoadingFullScreen />}>
      <AuthApp /> 
    </Suspense>
  )
}

export default function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}


