import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useAuth } from 'context/AuthContext'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import 'pages/DashTrade.css'

const NavBar = () => {
  const { logout } = useAuth()
  const [error, setError] = useState('')

  async function logOut() {
    try {
      setError('')
      await logout()
    } catch {
      setError('La déconnexion a échoué')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {/* <img
            className='nav__logo'
            src='/images/DashTrade-logo.png'
            alt='Logo DashTrade'
            style={margin}
          /> */}
          <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
            DashTrade
          </Typography>
          <img
            style={{ cursor: 'pointer' }}
            className='nav__avatar'
            src='/images/logout_icon_151219.png'
            alt='Déconnexion'
            onClick={logOut}
          />
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
