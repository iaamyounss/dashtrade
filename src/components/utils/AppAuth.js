import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/utils/ErrorFallback";
import { ReactLocation, Router, Outlet } from "react-location";
import { useAuth } from "context/utils/AuthContext";
import LoadingFullScreen from "components/utils/LoadingFullScreen";

function AuthApp() {
  const { logout } = useAuth();
  const Accueil = lazy(() => import("Routes/Accueil"));
  const Admin = lazy(() => import("Routes/Admin"));

  const routes = [
    {
      path: "/",
      element: <Accueil />,
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

export default AuthApp;
