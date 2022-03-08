import React from "react";
import OrdersPanel from "components/OrdersPanel";
//import NavBar from "components/NavBar";
import TypeOrdersMenu from "components/OrdersSideBar/TypeOrdersMenu";
import CssBaseline from "@mui/material/CssBaseline";
import SignalTable from "components/grid/SignalTable";
import StatsPanel from "components/statsPanel/StatsPanel";

const Accueil = () => {
  const [selectedToken, setSelectedToken] = React.useState("BTC/USDT");
  console.log(selectedToken);
  
  return (
    <div className="container">

      <CssBaseline />
      <div className="central-container">
        <div className="central-container-left">
          <NavBar />
          <StatsPanel />
          <SignalTable onSelectedToken={setSelectedToken} />
        </div>
        <TypeOrdersMenu className="central-container-right" />
      </div>
      <OrdersPanel />
    </div>
  );
};

export default Accueil;

