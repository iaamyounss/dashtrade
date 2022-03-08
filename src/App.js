import { useAuth } from 'context/utils/AuthContext'
import { lazy, Suspense } from 'react'
import { AppProviders } from 'context'
import LoadingFullScreen from 'components/utils/LoadingFullScreen'
const AuthApp = lazy(() => import(/* webpackPrefetch: true */ 'components/utils/AppAuth'))
const UnauthApp = lazy(() => import('components/utils/AppUnAuth'))

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
