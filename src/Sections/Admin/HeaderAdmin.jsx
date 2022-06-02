import React, { useState } from 'react';
//components
import Sidebar from 'Components/Sidebar';
import HeaderNavigation from '../Home/HeaderNavigation';
import HeaderAdminNavigation from './HeaderAdminNavigation';
//mui
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
//
import '../../index.css'



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

// function RightBar({navigation}) {
//   return (
//     <Drawer
//       open
//       anchor="right"
//       variant="persistent"
//       PaperProps={{
//         sx: {
//           display: {xs: 'none', sm: 'block'},
//           width: drawerWidth,
//           bgcolor: 'background.default',
//           borderRightStyle: 'dashed',
//         },
//       }}
//     >
//       {navigation}
//     </Drawer>
//   )
// }

function AdminMenu() {

  const [openSideBar, setOpenSideBar] = useState(true);
  const [openSwipeableDrawer, setOpenSwipeableDrawer] = useState(false);
  
  const handleOpenSideBar = () => setOpenSideBar(!openSideBar);
  const handleOpenSwipeableDrawer = () =>  setOpenSwipeableDrawer(!openSwipeableDrawer);

  const isOpen = openSwipeableDrawer;

  const drawerBleeding = 56;

  const AdminNavIcon = () => {
    return (
        <Button onClick={handleOpenSwipeableDrawer} className='admin_nav_icon'>
            <SettingsIcon fontSize="large"  />
        </Button>
    )
}

const SidebarIcon = () => (
  <Button onClick={handleOpenSideBar} className="admin_nav_icon">
    {' '}
    <MenuIcon fontSize="large" />{' '}
  </Button>
)

    return (
      <>

        



        {/* right bar should be there */}

        <AdminNavIcon />

        <SwipeableDrawer
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: `calc(100% - ${drawerHeight}px)`,
              marginTop: `${drawerHeight}px`,
            },
          }}
          anchor="right"
          open={isOpen}
          onClose={handleOpenSwipeableDrawer}
          onOpen={handleOpenSwipeableDrawer}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <HeaderAdminNavigation />
        </SwipeableDrawer>
      </>
    )
}
