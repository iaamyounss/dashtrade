import React from "react";
import OrdersPanel from "components/PanelOrders";
//import NavBar from "components/NavBar";
import TypeOrdersMenu from "components/OrdersNav";
import CssBaseline from "@mui/material/CssBaseline";
import SignalTable from "components/GridSignals";
import StatsPanel from "components/GlobalStats";
import Header from '../components/Header'
import OrderSend from '../components/OrdersSend'

const Accueil = () => {
  const [selectedToken, setSelectedToken] = React.useState("BTC/USDT");
  console.log(selectedToken);
  
  return (
    <div className="container">

      <CssBaseline />
      <div className="central-container">
        <div className="central-container-left">
          <Header />
          <StatsPanel />
          <SignalTable onSelectedToken={setSelectedToken} />
        </div>
        <TypeOrdersMenu 
          className="central-container-right" 
          selectedToken={selectedToken}
        />
      </div>
      <OrdersPanel />
      <OrderSend />
    </div>
  );
};

export default Accueil;

