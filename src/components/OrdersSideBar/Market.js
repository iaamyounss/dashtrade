import React from 'react';
import TypeOrdersFunc from './TypeOrdersFunc'
import './TypeOrders.css'


//Market component return un type d'ordre == market
// prend les props suivantes : 
// CurrentCurrencyFromAPI : get the current currency from API 
// CurrentPriceFromAPI    : get the current price in realtime from websocket 
// QuantityToBuy          : post the qty you want to buy/sell 

export default function Market() {
    return(
        <>
            <TypeOrdersFunc />
        </>
    )
}