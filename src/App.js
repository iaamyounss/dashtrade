import { Suspense } from 'react'
import { useAuth } from 'Services/Auth/AuthContext'
import { UnauthApp } from 'Services/Auth/Authentication';
import { BrowserRouter } from 'react-router-dom';
import AuthApp from 'Services/Auth/Authentication';
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import AuthContextProvider from "Services/Auth/AuthContext";
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
      <AuthContextProvider>
        <BrowserRouter>
          <ExchangeContextProvider>{children}</ExchangeContextProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  )
};

const AppConsumer = () => {
  const { authUser } = useAuth()
  return (
    <Suspense fallback={<LoadingFullScreen />}>
      {authUser ? <AuthApp /> : <UnauthApp />}
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


