import { useState } from 'react'
import Button from '@mui/material/Button'
import Orders from './Orders'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CloseIcon from '@mui/icons-material/Close';
//import Wallet from './OrdersWallet'
import './Orders.css'



export default function OrdersNavigation({selectedToken, open, onOpen }) {
  const drawerBleeding = 56;

return (
  // Displaying the Order Form onClick
  <SwipeableDrawer
    anchor="bottom"
    open={open}
    onClose={onOpen}
    onOpen={onOpen}
    swipeAreaWidth={drawerBleeding}
    disableSwipeToOpen={false}
    ModalProps={{
      keepMounted: true,
    }}
  >
      <Button onClick={onOpen}>
        <CloseIcon fontSize="large" />
      </Button>
      <OrderForm selectedToken={selectedToken} />

  </SwipeableDrawer>
)

}
  export function OrderForm({selectedToken}) {
  const [showLimit, setShowLimit] = useState(true)


  const handleLimitClick = () => {
    setShowLimit(!showLimit)
  }
  const handleMarketClick = () => {
    setShowLimit(!showLimit)
  }

  return (
    
    <div style={{padding: '20px'}} className='type-orders-menu'>
      
  
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
        ? <Orders 
            currentCurrencyAPI={selectedToken}
            type="LIMIT"
            
          /> 
        : <Orders 
            currentCurrencyAPI={selectedToken}
            type="MARKET"
            
          />
      }
    </div>
  )
}
