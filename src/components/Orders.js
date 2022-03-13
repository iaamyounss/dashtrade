import * as React from 'react'
import Typography from '@mui/material/Typography'
import * as binance from '../API/Binance/binanceProvider'
import './Orders.css'

// Orders is a component who take the current information from the API for the client and push the orders the client want to the API
// props : 
// currentCurrencyAPI  : get the current currency from API
// type : Is limit or market ? 
// timeInForce : GTC
// quantityToBuy    : post the qty you want to buy/sell
// currentPriceWS : get the current price in realtime from websocket

export default function Orders({
  currentCurrencyAPI,
  type, 
  currentPriceWS, 
}) {

  const [quantity, setQuantity] = React.useState(0)
  console.log(quantity)
  const handleQuantityChange = (quantity) => {
    setQuantity(quantity.target.value)
  }

  //  CurrentPriceAPI component take the currency on props and it value from API
  // Quantity take quantityToBuy= as props to push to API the qty to buy/sell 
  // ActionButtons Submit API 
  return (
    <div>
      <Typography
        component='div'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Typography component='span' style={{ textAlign: 'center' }}>
          {currentCurrencyAPI}
        </Typography>
      </Typography>
      
      <CurrentPriceAPI
        currentPriceWS={currentPriceWS}
        currentCurrencyAPI={currentCurrencyAPI}
      />

      <br />
      <Quantity
        quantity={quantity}
        setQuantity={handleQuantityChange}
        currentCurrencyAPI={currentCurrencyAPI}
      />
      
      <br />
      <ActionButtons 
          currentCurrencyAPI={currentCurrencyAPI}
          type={type}
          quantityToBuy={quantity}
          currentPriceWS={currentPriceWS}
      />
    </div>
  )
}

const CurrentPriceAPI = ({ currentPriceWS, currentCurrencyAPI }) => {

  return (
    <Typography component='div' className='currenctPriceContainer'>
      <Typography
        component='div'
        className='currentPrice-div'
        style={{ display: 'flex' }}
      >
        <Typography
          component='div'
          className='input-prefix'
          style={{ marginLeft: '8px' }}
        >
          <Typography variant='label'>Price</Typography>
        </Typography>
        <input
          type='text'
          value={currentPriceWS}
          className='input-price'
        />
        <Typography
          component='div'
          className='currencyFromAPI input-suffix'
          style={{ marginRight: '8px' }}
        >
          <Typography variant='label'>{currentCurrencyAPI}</Typography>
        </Typography>
      </Typography>
    </Typography>
  )
}

const Quantity = ({ quantity = 0, setQuantity, currentCurrencyAPI }) => {

  return (
    <Typography component='div' className='currenctPriceContainer'>
      <Typography
        component='div'
        className='currentPrice-div'
        style={{ display: 'flex' }}
      >
        <Typography
          component='div'
          className='input-prefix'
          style={{ marginLeft: '8px' }}
        >
          <Typography variant='label'>Quantity</Typography>
        </Typography>
        <input
          type='text'
          value={quantity}
          onChange={setQuantity}
          className='input-price'
        />
        <Typography
          component='div'
          className='currencyFromAPI input-suffix'
          style={{ marginRight: '8px' }}
        >
          <Typography variant='label'>{currentCurrencyAPI}</Typography>
        </Typography>
      </Typography>
    </Typography>
  )
}

function OrdersSend(
  token, 
  side, 
  type, 
  timeInForce,
  quantity,
  price,
) {

    binance
    .sendOrder(token, side, type, timeInForce, quantity, price)
    .then((response) => console.log(response))
    .catch((error) => console.log(error)) 
    
}

const ActionButtons = ({currentCurrencyAPI, type, quantityToBuy, currentPriceWS}) => {


  const [buyOrder, setBuyOrder] = React.useState(
    currentCurrencyAPI,
    'BUY',
    type, 
    "GTC",
    quantityToBuy,
    currentPriceWS,
  )
  const handleBuyOrder = () => {
    setBuyOrder(
      OrdersSend(
        currentCurrencyAPI, 
        'BUY', 
        type, 
        'GTC',
        quantityToBuy, 
        currentPriceWS,
      )
    )
  }

  const [sellOrder, setSellOrder] = React.useState(
    currentCurrencyAPI,
    'BUY',
    type, 
    "GTC",
    quantityToBuy,
    currentPriceWS,
  )
  const handleSellOrder = () => {
    setSellOrder(
      OrdersSend(
        currentCurrencyAPI, 
        'SELL', 
        type, 
        'GTC',
        quantityToBuy, 
        currentPriceWS,
      )
    )
  }
  return (
    <Typography component='div' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button
        className='order-btn order-buy'
        onClick={handleBuyOrder}
      >
        Buy
      </button>
      <button
        className='order-btn order-sell'
        onClick={handleSellOrder}
      >
        Sell
      </button>
    </Typography>
  )
}

