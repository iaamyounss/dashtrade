import React from 'react';
import TypeOrders from './TypeOrders'
import './TypeOrders.css'


//Market component return un type d'ordre == market
// prend les props suivantes : 
// CurrentCurrencyAPI : get the current currency from API 
// CurrentPriceWS    : get the current price in realtime from websocket 
// QuantityToBuy          : post the qty you want to buy/sell 

export default function Market({CurrentCurrencyAPI}) {
    console.log('market')
    return(
        <>
            <TypeOrders 
                CurrentCurrencyAPI={CurrentCurrencyAPI}
            />
        </>
    )
}