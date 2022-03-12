import React from "react";
import OrdersPanel from "components/PanelOrders";
//import NavBar from "components/NavBar";
import OrdersNav from "components/OrdersNav";
import CssBaseline from "@mui/material/CssBaseline";
import SignalTable from "components/GridSignals";
import StatsPanel from "components/GlobalStats";
import Header from '../components/Header'


const Accueil = () => {
  const [selectedToken, setSelectedToken] = React.useState("BTCUSDT");
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
        <OrdersNav
          className="central-container-right" 
          selectedToken={selectedToken}
        />
      </div>
      <OrdersPanel />

    </div>
  );
};

export default Accueil;

