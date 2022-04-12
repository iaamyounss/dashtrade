import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "utils/ErrorFallback";
import { ReactLocation, Router, Outlet } from "react-location";
import { useAuth } from "Context/AuthContext";
import LoadingFullScreen from "utils/LoadingFullScreen";
import LoginRegister from 'utils/LoginRegister'

export default function AuthApp() {
  const { logout } = useAuth();
  const Dashboard = lazy(() => import("Routes/Dashboard"));
  const Admin = lazy(() => import("Routes/Admin"));

  const routes = [
    {
      path: "/",
      element: <Dashboard />,
      logout,
    },
    {
      path: "/admin",
      element: <Admin />,
      logout,
    },
    // {
    //   path: '*',
    //   element: <Error404 />,
    //   logout,
    // },
  ];
  const location = new ReactLocation();

  return (
    <Router routes={routes} location={location}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFullScreen />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}




const imageUrl = 'images/Crypto-Trading-trading.jpg'

const backgroundStyle = {
  backgroundImage: `url('${imageUrl}')`,
  backgroundSize: 'cover',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  overflow: 'auto',
}

export function UnauthApp() {
  return (
    <div style={backgroundStyle}>
      <LoginRegister open />
    </div>
  )
}


