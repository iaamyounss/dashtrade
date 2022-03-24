import { useAuth } from 'Context/Utils/AuthContext'
import { lazy, Suspense } from 'react'
import { AppProviders } from 'Context'
import LoadingFullScreen from 'Components/Utils/LoadingFullScreen'
const AuthApp = lazy(() => import(/* webpackPrefetch: true */ 'Components/Utils/AppAuth'))
const UnauthApp = lazy(() => import('Components/Utils/AppUnAuth'))

const AppConsumer = () => {
  const { authUser } = useAuth()
  return (
    <Suspense fallback={<LoadingFullScreen />}>
      {authUser ? <AuthApp /> : <UnauthApp />}
    </Suspense>
  )
}

function App() {
  return (
    <AppProviders>
      <AppConsumer />
    </AppProviders>
  )
}

export default App
