import React from "react";
import OrdersPanel from "components/OrdersPanel";
import NavBar from "components/NavBar";
import TypeOrdersMenu from "components/OrdersSideBar/TypeOrdersMenu";
import CssBaseline from "@mui/material/CssBaseline";
import SignalTable from "components/grid/SignalTable";

const Accueil = () => {
  const [selectedToken, setSelectedToken] = React.useState("BTC/USDT");
  console.log(selectedToken);
  return (
    <div className="container">
      {/* <NavBar className='nav' /> */}
      <CssBaseline />
      <div className="central-container">
        <SignalTable
          onSelectedToken={setSelectedToken}
          className="central-container-left"
        />

        <TypeOrdersMenu className="central-container-right" />
      </div>
      <OrdersPanel />
    </div>
  );
};

export default Accueil;
