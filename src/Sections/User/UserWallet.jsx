import React from 'react';
import Typography from '@mui/material/Typography'
import '../../index.css'

export default function UserWallet() {
    console.log('open wallet component')
return(
    <Typography variant="div" className="wallet-pad">
        <Typography variant="h5" component="h3">Wallet</Typography>

        <Typography variant="div" className="wallet-balance">
            <Typography variant="label">All this stuff:</Typography> 
            <Typography variant="span">0</Typography>
        </Typography>
        <Typography variant="div" className="wallet-balance">
            <Typography variant="label">Is coming:</Typography> 
            <Typography variant="span">0</Typography>
        </Typography>
        <Typography variant="div" className="wallet-balance">
            <Typography variant="label">Very soon:</Typography> 
            <Typography variant="span">0</Typography>
        </Typography>
        <br />
    </Typography>
)
}