import React from 'react';
import Orders from './Orders'
import './Orders.css'

//Limit component return un type d'ordre == limit
// prend les props suivantes : 
// CurrentCurrencyAPI : get the current currency from API 
// CurrentPriceWS    : get the current price in realtime from websocket 
// QuantityToBuy          : post the qty you want to buy/sell 


export default function Limit({CurrentCurrencyAPI}) {
    console.log('limit')
    return(
        <>
            <Orders 
                CurrentCurrencyAPI={CurrentCurrencyAPI}
            />
        </>
    )
}


