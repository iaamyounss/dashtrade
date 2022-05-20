import * as React from 'react'
import { postOrders, getLastPriceToken } from '../Services/API/ApiProvider'
import { useExchange } from '../Services/API/ExchangeContext'
import TokenPrice from './TokenPrice'
import TokenQuantity from './TokenQuantity'
import PostOrders from './PostOrders'
import Typography from '@mui/material/Typography'




// Order component to POST a market position 

export default function OrdersForm({ token, type }) 
{
  const { exchange } = useExchange()

  const apiKeys = { 
    APIKEY:exchange[0]?.publicKey,
    APISECRET:exchange[0]?.privateKey,
  }
  const [lastPrice, setLastPrice] = React.useState('')

  const updatePrice = () => updateLastPrice(token, setLastPrice)
  
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

      <Typography component="div" style={{display: 'flex', justifyContent: 'center'}}><Typography component="span" style={{textAlign: 'center'}}> {token} </Typography></Typography>

      <TokenPrice token={token} lastPrice={lastPrice} updatePrice={updatePrice} />

      <br />
      <TokenQuantity token={token} quantity={quantity} setQuantity={handleQuantityChange} />

      <br />
      <PostOrders apiKeys={apiKeys} token={token} lastPrice={lastPrice} type={type} quantity={quantity} />
    
    </div>
  )


}

// import function from binance provider 

function updateLastPrice(token, setLastPrice){

  getLastPriceToken(token)
    .then((response) =>  setLastPrice(response.data.price))
    .catch((error) => console.log(error))

  return null
}

export function postOrder(apiKeys, token, side, type, timeInForce, quantity, price)
 {
  /*
  if (quantity <= 0) {
    return <Alert severity="error">Merci de rentrer une qty valide !</Alert>
  }
  if (typeof quantity != 'number') {
    return <Alert severity="warning">Merci de rentrer un nombre !</Alert>
  }
  */
  postOrders(apiKeys, token, side, type, timeInForce, quantity, price)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}