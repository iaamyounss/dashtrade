import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/ErrorFallback";
import { ReactLocation, Router, Outlet } from "react-location";
import { useAuth } from "context/AuthContext";
import LoadingFullScreen from "components/LoadingFullScreen";

function AuthApp() {
  const { logout } = useAuth();
  const Accueil = lazy(() => import("pages/Accueil"));
  const Admin = lazy(() => import("pages/Admin"));

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
