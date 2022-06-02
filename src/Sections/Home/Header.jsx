import * as React from 'react';
import HeaderNavigation  from './HeaderNavigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useAuth } from "Services/Auth/AuthContext";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import '../../index.css'


export default function Header({onOpenSideBar}) {
  
  const title = 'DashTrade'

  // remove the default state because warn
  const [setError] = React.useState("");
  
  const { logout } = useAuth();
  
  async function logOut() {
      try{
          await logout();
      } catch {
          setError("la déconnexion a échoué")
      }
  }



  return (
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography variant="h6" noWrap component="div" sx={{mr: 2, display: {xs: 'none', md: 'flex'}}} >
            {title}
          </Typography>

          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'block'}}}>

            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={onOpenSideBar} color="inherit" >
              <MenuIcon />
            </IconButton>

          </Box>

          <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}} >
            {title}
          </Typography>


          <ExitToAppIcon color="white" fontSize="large" onClick={logOut} />
          
        </Toolbar>
      </Container>
    </AppBar>
  )
};

