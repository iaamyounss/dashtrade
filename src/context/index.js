import createTheme from '@mui/material/styles/createTheme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import AuthContextProvider from 'context/AuthContext'
import TabsContextProvider from 'context/TabsContext'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'
// import { HistoryContextProvider } from './HistoryContext'

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       useErrorBoundary: true,
//       refetchOnWindowFocus: false,
//       retryDelay: 500,
//       retry: (failureCount, error) => {
//         if (error.status === 404) return false
//         else if (error.status === 401) return false
//         else if (failureCount > 3) return false
//         else return true
//       },
//     },
//     mutations: {
//       useErrorBoundary: false,
//       refetchOnWindowFocus: false,
//       retryDelay: 500,
//       retry: 1,
//       // mutation options
//     },
//   },
// })

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#767676',
    },
    secondary: {
      main: '#E50914',
    },
  },
})

const AppProviders = ({ children }) => {
  return (
    // <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      {/* <HistoryContextProvider> */}
      <TabsContextProvider>
        <AuthContextProvider>{children} </AuthContextProvider>
      </TabsContextProvider>
      {/* </HistoryContextProvider> */}
    </ThemeProvider>
    //   {process.env.NODE_ENV === 'development' && (
    //     <ReactQueryDevtools initialIsOpen={false} />
    //   )}
    // </QueryClientProvider>
  )
}

export { AppProviders }
