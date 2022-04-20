import { useAuth } from 'Services/Auth/AuthContext'
import { Suspense } from 'react'
import LoadingFullScreen from 'Helpers/LoadingFullScreen'
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import AuthContextProvider from "Services/Auth/AuthContext";
import ExchangeContextProvider from "./Services/API/ExchangeContext";
import { UnauthApp } from 'Services/Auth/AppAuth';
import AuthApp from 'Services/Auth/AppAuth';

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
          <ExchangeContextProvider>
            {children}
          </ExchangeContextProvider>
        </AuthContextProvider>
    </ThemeProvider>
  );
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


