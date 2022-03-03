import { useState } from 'react'
import Button from '@mui/material/Button'
import Limit from './Limit'
import Market from './Market'
import Wallet from './Wallet'
import Divider from '@mui/material/Divider'
import './TypeOrders.css'

// TypeOrdersMenu est un composent de Type Drawer qui contient toute la logique de la sideBar
// Responsive, switch from Limit to Market
// Le props titleMenu est le composant "ordres" qui ouvre/ferme la sideBar via onClick
// Toute la logique des ordres est implémenter dans TypeOrdersFunc

export default function TypeOrdersMenu(props) {
  const [showLimit, setShowLimit] = useState(true)

  /*
    When limit component is show, the market component is hidden
     create buttons and add onclick f
    unction which is rendering the component choiced by the btn
    */

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
      {showLimit ? <Limit /> : <Market />}
    </div>
  )
}
