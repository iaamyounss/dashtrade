import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Link } from "react-location";
import { useAuth } from "Context/Utils/AuthContext";
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./Header.css";


const ResponsiveHeader = () => {
  const [bool, setBool] = React.useState(null);
  const { logout } = useAuth();
  // remove the default state because warn
  const [setError] = React.useState("");
  const handleOpenNavMenu = (event) => {
    setBool(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setBool(null);
  };

  async function logOut(event) {
      try{
          await logout();
      } catch {
          setError("la déconnexion a échoué")
      }
  }
// factorise Links in React functional component for MàJ auto responsive 
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            DashTrade
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={bool}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(bool)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <Link to="/">
                    <Button variant="h6" component="div" >
                    Dashboard
                    </Button>
                </Link>
                <Link to="/admin">
                    <Button variant="h6" component="div" >
                    Admin
                    </Button>
                </Link>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            DashTrade
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to="/">
                <Button variant="h6" component="div">
                Dashboard
                </Button>
            </Link>
            <Link to="/admin">
                <Button variant="h6" component="div">
                Admin
                </Button>
            </Link>
          </Box>

          <ExitToAppIcon color='white' fontSize='large' onClick={logOut} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveHeader;
