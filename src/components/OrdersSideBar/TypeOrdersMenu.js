import { useState } from 'react'
import Button from '@mui/material/Button'
import Limit from './Limit'
import Market from './Market'
import Wallet from './Wallet'
import Divider from '@mui/material/Divider'
import './TypeOrders.css'


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
