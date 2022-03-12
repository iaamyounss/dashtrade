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
  timeInForce="GTC",
  quantityToBuy=0.03,
  currentPriceWS=39180, 
}) {

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
      {/* The CurrentPriceApi component take the currency on props and it value from API */}
      <CurrentPriceAPI
        currentPriceWS={currentPriceWS}
        currentCurrencyAPI={currentCurrencyAPI}
      />
      <br />
      {/* Quantity take quantityToBuy= as props to push to API the qty to buy/sell */}
      <Quantity
        quantityToBuy={quantityToBuy}
        currentCurrencyAPI={currentCurrencyAPI}
      />
      <br />
      {/* ActionButtons Submit API */}
      <ActionButtons 
          currentCurrencyAPI={currentCurrencyAPI}
          type={type}
          timeInForce={timeInForce}
          quantityToBuy={quantityToBuy}
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
          defaultValue={currentPriceWS}
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

const Quantity = ({ quantityToBuy, currentCurrencyAPI }) => {
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
          defaultValue={quantityToBuy}
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

const ActionButtons = () => {

  let initialState 

  function reducer(state, action) {
    switch (action.type) {
      case 'BUY':
        OrdersSend(
          'BTCUSDT',
          'BUY',
          'LIMIT',
          'GTC',
          0.3,
          38880
        )
      break
      case 'SELL':
        OrdersSend(
          'BTCUSDT',
          'SELL',
          'LIMIT',
          'GTC',
          0.3,
          38880
        )
      break
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <Typography component='div' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button
        className='order-btn order-buy'
        onClick={() => {dispatch({type: 'BUY'})}}
      >
        Buy
      </button>
      <button
        className='order-btn order-sell'
        onClick={() => {dispatch({type: 'SELL'})}}
      >
        Sell
      </button>
    </Typography>
  )
}

