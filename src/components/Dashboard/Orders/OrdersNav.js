import { useState } from 'react'
import Button from '@mui/material/Button'
import Limit from './OrdersLimit'
import Market from './OrdersMarket'
import Wallet from './OrdersWallet'
import './Orders.css'


export default function OrdersNav({selectedToken}) {
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
  
      <br />
      <div>
        <Button 
          onClick={handleLimitClick}
          className={showLimit ? 'isActive': null}
          >
          Limit
        </Button>
        <Button 
          onClick={handleMarketClick}
          className={showLimit ? null : 'isActive'}
          >
          Market
        </Button>
      </div>
      <br />
      {showLimit
        ? <Limit 
            currentCurrencyAPI={selectedToken}
            
          /> 
        : <Market 
            currentCurrencyAPI={selectedToken}
            
          />
      }
    </div>
  )
}
