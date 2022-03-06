import React from 'react';
import Typography from '@mui/material/Typography'
import './TypeOrders.css'

// les données du Wallet restent en dur pour le moment
// les données du wallet seront à implémenter dans un second temps afin de ne pas nous perdre
// le premier but étant de voir les prix du marché en temps réel et de passer un ordre 
export default function Wallet() {
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