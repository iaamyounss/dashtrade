import * as React from 'react'
import Typography from '@mui/material/Typography'
import { useExchange } from '../../../Context/Utils/ExchangeContext'
import * as binance from '../../../API/Exchanges/Binance/binanceProvider'
import './Orders.css'


// import functions from binance provider 
function OrdersSend(
  apiKeys,
  token, 
  side, 
  type, 
  timeInForce,
  quantity,
  price,
) {

    binance
    .sendOrder(apiKeys, token, side, type, timeInForce, quantity, price)
    .then((response) => console.log(response))
    .catch((error) => console.log(error)) 
    
}

function updateLastPrice(currentCurrencyAPI, setLastPrice){

  binance
    .getLastPriceToken(currentCurrencyAPI)
    .then((response) =>  setLastPrice(response.data.price))
    .catch((error) => console.log(error))

  return null
}


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
}) {
  const { exchange } = useExchange()
  const apiKeys = { 

    APIKEY:exchange[0]?.publicKey,
    APISECRET:exchange[0]?.privateKey,
  
}
  const [lastPrice, setLastPrice] = React.useState('')
  const updatePrice = () => updateLastPrice(currentCurrencyAPI, setLastPrice)
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    updatePrice()
  },[])

  const [quantity, setQuantity] = React.useState(0)
  const handleQuantityChange = (quantity) => {
    setQuantity(quantity.target.value)
  }

  

  //  CurrentPriceAPI component take the currency on props and it value from API
  // Quantity take quantityToBuy= as props to push to API the qty to buy/sell 
  // ActionButtons Submit API 
  return (
    <div>
      <Typography component='div' style={{ display: 'flex', justifyContent: 'center' }}><Typography component='span' style={{ textAlign: 'center' }}>
          {currentCurrencyAPI}
        </Typography>
      </Typography>
      
      <CurrentPriceAPI
        currentPrice={lastPrice}
        updatePrice={updatePrice}
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
          apiKeys={apiKeys}
          type={type}
          quantityToBuy={quantity}
          currentPrice={lastPrice}
          currentCurrencyAPI={currentCurrencyAPI}
      />
    </div>
  )
}


const CurrentPriceAPI = ({currentCurrencyAPI, currentPrice, updatePrice}) => {
  /* 
  on click  R -> refresh price input value 
  lift state up ->  parent 
  parent props drill to action Buttons
  */

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

        <span className='input-price'>{currentPrice}</span>

        <Typography
          component='button'
          className='currencyFromAPI'
          style={{ marginRight: '8px', marginLeft: '8px' }}
          onClick={updatePrice}
        >
          R
        </Typography>
        
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

const Quantity = ({ quantity = 0.02, setQuantity, currentCurrencyAPI }) => {

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

const ActionButtons = ({apiKeys, currentCurrencyAPI, currentPrice, type, quantityToBuy}) => {


  const [, setBuyOrder] = React.useState(
    apiKeys,
    currentCurrencyAPI,
    'BUY',
    type, 
    "GTC",
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
      )
    )
  }

  const [, setSellOrder] = React.useState(
    apiKeys,
    currentCurrencyAPI,
    'BUY',
    type, 
    "GTC",
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

