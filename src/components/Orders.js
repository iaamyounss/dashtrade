import React from 'react'
import Typography from '@mui/material/Typography'
import './Orders.css'

// Orders is a component who take the current information from the API for the client and push the orders the client want to the API
// Orders take as props :
// CurrentCurrencyAPI : get the current currency from API
// CurrentPriceWS     : get the current price in realtime from websocket
// QuantityToBuy      : post the qty you want to buy/sell
//

export default function Orders({
  CurrentCurrencyAPI = 'BTCUSDT',
  CurrentPriceWS = '42511',
  QuantityToBuy = '0.87552',
}) {
  return (
    <form>
      <Typography
        component='div'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Typography component='span' style={{ textAlign: 'center' }}>
          {CurrentCurrencyAPI}
        </Typography>
      </Typography>
      {/* The CurrentPriceApi component take the currency on props and it value from API */}
      <CurrentPriceAPI
        CurrentPriceWS={CurrentPriceWS}
        CurrentCurrencyAPI={CurrentCurrencyAPI}
      />
      <br />
      {/* Quantity take quantityToBuy= as props to push to API the qty to buy/sell */}
      <Quantity
        QuantityToBuy={QuantityToBuy}
        CurrentCurrencyAPI={CurrentCurrencyAPI}
      />
      <br />
      {/* ActionButtons push buySubmit & sellSubmit props to API */}
      <ActionButtons />
    </form>
  )
}

const CurrentPriceAPI = ({ CurrentPriceWS, CurrentCurrencyAPI }) => {
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
          defaultValue={CurrentPriceWS}
          className='input-price'
        />
        <Typography
          component='div'
          className='currencyFromAPI input-suffix'
          style={{ marginRight: '8px' }}
        >
          <Typography variant='label'>{CurrentCurrencyAPI}</Typography>
        </Typography>
      </Typography>
    </Typography>
  )
}

const Quantity = ({ QuantityToBuy, CurrentCurrencyAPI }) => {
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
          defaultValue={QuantityToBuy}
          className='input-price'
        />
        <Typography
          component='div'
          className='currencyFromAPI input-suffix'
          style={{ marginRight: '8px' }}
        >
          <Typography variant='label'>{CurrentCurrencyAPI}</Typography>
        </Typography>
      </Typography>
    </Typography>
  )
}

const ActionButtons = ({ buySubmit, sellSubmit }) => {
  return (
    <Typography component='div' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography
        component='button'
        className='order-btn order-buy'
        onSubmit={buySubmit}
      >
        Buy
      </Typography>
      <Typography
        component='button'
        className='order-btn order-sell'
        onSubmit={sellSubmit}
      >
        Sell
      </Typography>
    </Typography>
  )
}

// CREATE BUYSUBMIT AND SELLSUBMIT WITH IMPORT ORDERS FROM BINANCE PROVIDER / ORDERSEND