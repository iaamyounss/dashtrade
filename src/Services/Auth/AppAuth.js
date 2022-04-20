import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ReactLocation, Router, Outlet } from "react-location";
import { useAuth } from "Services/Auth/AuthContext";
import ErrorFallback from "Helpers/ErrorFallback";
import LoadingFullScreen from "Helpers/LoadingFullScreen";
import OpenRegisterModal from 'Components/OpenRegisterModal'
import '../../index.css'

export default function AuthApp() {
  const { logout } = useAuth();
  const Dashboard = lazy(() => import("Routes/Home/Home"));
  const Admin = lazy(() => import("Routes/Admin/Admin"));

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




export function UnauthApp() {
  return (
    <div className="two-panel-layout backgroundImage">
      <OpenRegisterModal  />
      <div  className='left-panel'></div>
    </div>
  )
}


