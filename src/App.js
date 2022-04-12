import { useAuth } from 'Context/AuthContext'
import { Suspense } from 'react'
import LoadingFullScreen from 'utils/LoadingFullScreen'
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import AuthContextProvider from "Context/AuthContext";
import ExchangeContextProvider from "./Context/ExchangeContext";
import { UnauthApp } from 'utils/AppAuth';
import AuthApp from 'utils/AppAuth';

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


