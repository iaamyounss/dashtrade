import * as React from 'react'
import * as binance from '../../../API/Exchanges/Binance/binanceProvider'
import { useExchange } from '../../../Context/ExchangeContext'
import {CurrentPriceAPI, Quantity, ActionButtons} from './OrdersView'
import Typography from '@mui/material/Typography'


// import function from binance provider 

function updateLastPrice(currentCurrencyAPI, setLastPrice){

  binance
    .getLastPriceToken(currentCurrencyAPI)
    .then((response) =>  setLastPrice(response.data.price))
    .catch((error) => console.log(error))

  return null
}



// type : Is limit or market ? 
// timeInForce : GTC by default 

// Order component to POST a market position 

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

  

  return (
      // empty div for responsive usage
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

