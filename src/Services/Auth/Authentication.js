import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Routes, Route } from "react-router-dom";
import ErrorFallback from "Helpers/ErrorFallback";
import LoadingFullScreen from "Helpers/LoadingFullScreen";
import LoginPage from 'Pages/Login/LoginPage'
import Home from 'Pages/Home/Home';
import Admin from 'Pages/Admin/Admin';
import Tokens from 'Pages/Tokens/Tokens';
import UserWallet from 'Sections/User/UserWallet';
import '../../index.css'

export default function AuthApp() {

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingFullScreen />}>
        <Routes>
          <Route path="/" element={<Home />}>
            Home
          </Route>
          <Route path="admin" element={<Admin />}>
            
            <Route path="wallet" element={<UserWallet />}/>
          </Route>
          <Route path="/tokens" element={<Tokens />}/>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}




export function UnauthApp() {
  return (
    <div className="two-panel-layout backgroundImage">
      <LoginPage  />
      <div  className='left-panel'></div>
    </div>
  )
}


