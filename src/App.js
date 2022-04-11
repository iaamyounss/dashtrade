import { useAuth } from 'Context/Utils/AuthContext'
import { lazy, Suspense } from 'react'
//import { AppProviders } from 'Context'
import LoadingFullScreen from 'Components/Utils/LoadingFullScreen'
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import AuthContextProvider from "Context/Utils/AuthContext";
import ExchangeContextProvider from "./Context/Utils/ExchangeContext";
const AuthApp = lazy(() => import(/* webpackPrefetch: true */ 'Components/Utils/AppAuth'))
const UnauthApp = lazy(() => import('Components/Utils/AppUnAuth'))

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
          <ExchangeContextProvider>{children}</ExchangeContextProvider>
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


