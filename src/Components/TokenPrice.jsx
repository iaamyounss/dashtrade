import { Typography } from '@mui/material'
import '../index.css'

export default function TokenPrice({ token, lastPrice, updatePrice })  
  {
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
  
          <span className="input-price">{lastPrice}</span>
  
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
            <Typography variant="label">{token}</Typography>
          </Typography>
        </Typography>
      </Typography>
    )
  }