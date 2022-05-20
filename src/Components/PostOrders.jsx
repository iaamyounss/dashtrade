import React from 'react'
import { postOrder } from './OrdersForm'
import { Typography } from '@mui/material'
import '../index.css'

export default function PostOrders ({ apiKeys, token, lastPrice, type, quantity }) 
{
    const [, setBuyOrder] = React.useState( apiKeys, token, 'BUY', type, 'GTC', quantity, lastPrice, )

    const handleBuyOrder = () => {
      setBuyOrder(
        postOrder( apiKeys, token, 'BUY', type, 'GTC', quantity, lastPrice)
      )
    }
  
    const [, setSellOrder] = React.useState(apiKeys, token, 'BUY', type, 'GTC', quantity, lastPrice)
    
    const handleSellOrder = () => {
      setSellOrder(
        postOrder(apiKeys, token, 'SELL', type, 'GTC', quantity, lastPrice)
      )
    }
  
    return (
      <Typography
        component="div"
        style={{display: 'flex', justifyContent: 'space-between'}}
      >
        <button className="order-btn order-buy" onClick={handleBuyOrder}>
          Buy
        </button>
        <button className="order-btn order-sell" onClick={handleSellOrder}>
          Sell
        </button>
      </Typography>
    )
  }