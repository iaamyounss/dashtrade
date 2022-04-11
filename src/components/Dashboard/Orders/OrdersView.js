import React from 'react'
import Typography from '@mui/material/Typography'
//import Alert from '@mui/material/Alert'
import * as binance from '../../../API/Exchanges/Binance/binanceProvider'
import './Orders.css'

// import function from binance provider
export function OrdersSend(
  apiKeys,
  token,
  side,
  type,
  timeInForce,
  quantity,
  price,
) {
  /*
  if (quantity <= 0) {
    return <Alert severity="error">Merci de rentrer une qty valide !</Alert>
  }
  if (typeof quantity != 'number') {
    return <Alert severity="warning">Merci de rentrer un nombre !</Alert>
  }
  */
  binance
    .sendOrder(apiKeys, token, side, type, timeInForce, quantity, price)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
export const CurrentPriceAPI = ({
  currentCurrencyAPI,
  currentPrice,
  updatePrice,
}) => {
  /* 
    on click  R -> refresh price input value 
    lift state up ->  parent 
    parent props drill to action Buttons
    */

  return (
    <Typography component="div" className="currenctPriceContainer">
      <Typography
        component="div"
        className="currentPrice-div"
        style={{display: 'flex'}}
      >
        <Typography
          component="div"
          className="input-prefix"
          style={{marginLeft: '8px'}}
        >
          <Typography variant="label">Price</Typography>
        </Typography>

        <span className="input-price">{currentPrice}</span>

        <Typography
          component="button"
          className="currencyFromAPI"
          style={{marginRight: '8px', marginLeft: '8px'}}
          onClick={updatePrice}
        >
          R
        </Typography>

        <Typography
          component="div"
          className="currencyFromAPI input-suffix"
          style={{marginRight: '8px'}}
        >
          <Typography variant="label">{currentCurrencyAPI}</Typography>
        </Typography>
      </Typography>
    </Typography>
  )
}

export const Quantity = ({
  quantity = 0.02,
  setQuantity,
  currentCurrencyAPI,
}) => {
  return (
    <Typography component="div" className="currenctPriceContainer">
      <Typography
        component="div"
        className="currentPrice-div"
        style={{display: 'flex'}}
      >
        <Typography
          component="div"
          className="input-prefix"
          style={{marginLeft: '8px'}}
        >
          <Typography variant="label">Quantity</Typography>
        </Typography>
        <input
          type="text"
          value={quantity}
          onChange={setQuantity}
          className="input-price"
        />
        <Typography
          component="div"
          className="currencyFromAPI input-suffix"
          style={{marginRight: '8px'}}
        >
          <Typography variant="label">{currentCurrencyAPI}</Typography>
        </Typography>
      </Typography>
    </Typography>
  )
}

export const ActionButtons = ({
  apiKeys,
  currentCurrencyAPI,
  currentPrice,
  type,
  quantityToBuy,
}) => {
  const [, setBuyOrder] = React.useState(
    apiKeys,
    currentCurrencyAPI,
    'BUY',
    type,
    'GTC',
    quantityToBuy,
    currentPrice,
  )
  const handleBuyOrder = () => {
    setBuyOrder(
      OrdersSend(
        apiKeys,
        currentCurrencyAPI,
        'BUY',
        type,
        'GTC',
        quantityToBuy,
        currentPrice,
      ),
    )
  }

  const [, setSellOrder] = React.useState(
    apiKeys,
    currentCurrencyAPI,
    'BUY',
    type,
    'GTC',
    quantityToBuy,
    currentPrice,
  )
  const handleSellOrder = () => {
    setSellOrder(
      OrdersSend(
        apiKeys,
        currentCurrencyAPI,
        'SELL',
        type,
        'GTC',
        quantityToBuy,
        currentPrice,
      ),
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
