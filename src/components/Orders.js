import React from 'react'
import Typography from '@mui/material/Typography'
import './Orders.css'

// TypesOrdersFunc is a component who take the current information from the API for the client and push the orders the client want to the API
// TypeOrdersFunc take as props :
// CurrentCurrencyFromAPI : get the current currency from API
// CurrentPriceFromAPI    : get the current price in realtime from websocket
// QuantityToBuy          : post the qty you want to buy/sell
//

export default function TypeOrdersFunc({
  CurrentCurrencyFromAPI = 'BTCUSDT',
  CurrentPriceFromAPI = '42511',
  QuantityToBuy = '0.87552',
}) {
  return (
    <form>
      <Typography
        component='div'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Typography component='span' style={{ textAlign: 'center' }}>
          {CurrentCurrencyFromAPI}
        </Typography>
      </Typography>
      {/* The CurrentPriceApi component take the currency on props and it value from API */}
      <CurrentPriceApi
        CurrentPriceFromAPI={CurrentPriceFromAPI}
        CurrentCurrencyFromAPI={CurrentCurrencyFromAPI}
      />
      <br />
      {/* Quantity take quantityToBuy= as props to push to API the qty to buy/sell */}
      <Quantity
        QuantityToBuy={QuantityToBuy}
        CurrentCurrencyFromAPI={CurrentCurrencyFromAPI}
      />
      <br />
      {/* ActionButtons push buySubmit & sellSubmit props to API */}
      <ActionButtons />
    </form>
  )
}

const CurrentPriceApi = ({ CurrentPriceFromAPI, CurrentCurrencyFromAPI }) => {
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
          defaultValue={CurrentPriceFromAPI}
          className='input-price'
        />
        <Typography
          component='div'
          className='currencyFromAPI input-suffix'
          style={{ marginRight: '8px' }}
        >
          <Typography variant='label'>{CurrentCurrencyFromAPI}</Typography>
        </Typography>
      </Typography>
    </Typography>
  )
}

const Quantity = ({ QuantityToBuy, CurrentCurrencyFromAPI }) => {
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
          <Typography variant='label'>{CurrentCurrencyFromAPI}</Typography>
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