import { useState } from 'react'
import Button from '@mui/material/Button'
import Limit from './OrdersLimit'
import Market from './OrdersMarket'
import Wallet from './OrdersWallet'
import Divider from '@mui/material/Divider'
import './Orders.css'


export default function TypeOrdersMenu({selectedToken}) {
  const [showLimit, setShowLimit] = useState(true)

  const handleLimitClick = () => {
    setShowLimit(!showLimit)
  }
  const handleMarketClick = () => {
    setShowLimit(!showLimit)
  }

  return (
    <div className='type-orders-menu'>
      <Wallet />
      <Divider />
      <br />
      <div>
        <Button onClick={handleLimitClick}>Limit</Button>
        <Button onClick={handleMarketClick}>Market</Button>
      </div>
      <br />
      {showLimit
        ? <Limit CurrentCurrencyAPI={selectedToken}/> 
        : <Market CurrentCurrencyAPI={selectedToken}/>
      }
    </div>
  )
}
