import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

function LoadingFullScreen() {
  return (
    <Backdrop open>
      <CircularProgress color='secondary' />
    </Backdrop>
  )
}

export default LoadingFullScreen
