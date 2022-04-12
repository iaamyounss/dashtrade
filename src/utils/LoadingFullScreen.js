import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function LoadingFullScreen() {
  return (
    <Backdrop open>
      <CircularProgress color='secondary' />
    </Backdrop>
  )
}


