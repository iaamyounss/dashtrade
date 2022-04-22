import { useState } from 'react';
import { Link } from 'react-location';
import HeaderNavigation from './HeaderNavigation';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import SettingsIcon from '@mui/icons-material/Settings';
import '../index.css'

const drawerWidth = 240;
const drawerHeight = 64;

export default function HeaderAdmin() {

    return (
        <div className="adminHeader flex-align-center background-black">
            <AdminMenu />
            <HeaderNavigation style={{ paddingRight: drawerHeight, }} />
        </div>

    )
}

function AdminNavigation() {
  return (
    <>
      <Link to="/"> <Button variant="h6" component="div"> Wallet </Button></Link>

      <Link to="/"> <Button variant="h6" component="div"> Options </Button></Link>

      <Link to="/"> <Button variant="h6" component="div"> API Keys </Button></Link>

      <Link to="/"> <Button variant="h6" component="div"> General </Button></Link>
    </>
  )
}




function AdminMenu() {

  const [state, setState] = useState(false);

  const handleOpen = () => {
    
    setState(!state);
  }
  const open = state;

  const drawerBleeding = 56;

  const AdminNavIcon = () => {
    return (
        <Button onClick={handleOpen} className='admin_nav_icon'>
            <SettingsIcon fontSize="large"  />
        </Button>
    )
}

    return (
      <>

        <Drawer variant="permanent" 
          sx={{ display: {xs: 'none', sm: 'block'}, '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth, height: `calc(100% - ${drawerHeight}px)`, marginTop: `${drawerHeight}px`}, }}
          open >
            <AdminNavigation />
        </Drawer>

        <AdminNavIcon />

        <SwipeableDrawer 
          sx={{ display: {xs: 'block', sm: 'none'}, '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth, height: `calc(100% - ${drawerHeight}px)`, marginTop: `${drawerHeight}px`}, }}
          anchor="left"
          open={open}
          onClose={handleOpen}
          onOpen={handleOpen}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}>
            <AdminNavigation />
        </SwipeableDrawer>

      </>
    )
}
