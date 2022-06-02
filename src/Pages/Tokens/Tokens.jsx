import React from "react";
import OpenPositions from "Components/OpenPositions";
import OrdersTypeSwitcher from "Sections/Orders/OrdersTypeSwitcher";
import MarketViewWithCandles from "Components/MarketViewWithCandles";
import MarketViewWithCharts from "Components/MarketViewWithCharts";
import HeaderAdmin from "Sections/Admin/HeaderAdmin";
//import { Outlet } from "react-router-dom";
  // move the signal tables to an alone Route
  // create a checkSignals functionality to see 
  // the market currencys that i want

export default function Tokens() {

  const [selectedToken, setSelectedToken] = React.useState("BTCUSDT");
  // ?
  const [dataStats, setDataStats] = React.useState([]);

  const [openOrder, setOpenOrder] = React.useState(false);


  const handleOpen = () => {
    setOpenOrder(!openOrder);
  }

  const handleTrendUpdate = (trendData) => {
    setDataStats(trendData);
  };


  // move the signal tables to an alone Route
  // create a checkSignals to see the market currencys that i want
  return (
    <div>
      <HeaderAdmin />

      <MarketViewWithCharts
        dataStats={dataStats}
        selectedToken={selectedToken}
      />

      <MarketViewWithCandles
        onSelectedToken={setSelectedToken}
        setTrendUpdate={handleTrendUpdate}
        handleOpen={handleOpen}
      />

      <OrdersTypeSwitcher
        className="central-container-right"
        selectedToken={selectedToken}
        open={openOrder}
        onOpen={handleOpen}
      />

      <OpenPositions />
    </div>
  )
};


