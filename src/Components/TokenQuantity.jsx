import { Typography } from '@mui/material'
import '../index.css'

export default function TokenQuantity({ token, quantity, setQuantity }) 
  {
    return (
      <Typography component="div" className="currenctPriceContainer">

        <Typography component="div" className="currentPrice-div" style={{display: 'flex'}} >

          <Typography component="div" className="input-prefix" style={{marginLeft: '8px'}} >
            <Typography variant="label">Quantity</Typography>
          </Typography>

          <input
            type="text"
            value={quantity}
            onChange={setQuantity}
            className="input-price"
          />

          <Typography component="div" className="currencyFromAPI input-suffix" style={{marginRight: '8px'}} >
            <Typography variant="label">{token}</Typography>
          </Typography>

        </Typography>
      </Typography>
    )
  }