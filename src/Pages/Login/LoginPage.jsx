import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert';
import LoginForm from './LoginForm';
import RegisterModal from './RegisterModal';
import '../../index.css'

export default function LoginPage(){


  const [ error, setError] = useState(false);
  
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
    
  
    
    return (
      <div style={{padding: '20px'}} className="right-panel rmt-50pct">

        <LoginForm setError={setError} />
        <Button onClick={handleOpen} >Pas encore inscrit ? </Button>

        {error ? <Alert severity="error">{error}</Alert> : null}

        <KeepMountedModal open={open} handleClose={handleClose}/>
        
      </div>
    )
}


function KeepMountedModal({open, handleClose}) {

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        >
        <Box sx={style}>
          <RegisterModal />
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'aliceblue',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};