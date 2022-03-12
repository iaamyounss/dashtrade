import React from 'react';
import Orders from './Orders'
import './Orders.css'

//Market component return order type == limit
//  props  : 
// currentCurrencyAPI  : get the current currency from API
// currentPriceWS : get the current price in realtime from websocket
// type : Is limit or market ? 

export default function Market({
    currentCurrencyAPI,   
    currentPriceWS,
}) {
    
    return(
        <>
            <Orders 
                currentCurrencyAPI={currentCurrencyAPI}
                currentPriceWS={currentPriceWS}
                type="MARKET"
            />
        </>
    )
}