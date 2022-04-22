import React from "react";
import OpenPositions from "Components/OpenPositions";
import OrdersTypeSwitcher from "Components/OrdersTypeSwitcher";
import MarketViewWithCandles from "Components/MarketViewWithCandles";
import MarketViewWithCharts from "Components/MarketViewWithCharts";
import Header from "Components/Header";


export default function Home() {

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
          <Header />

          <MarketViewWithCharts  dataStats={dataStats} selectedToken={selectedToken} />
          
          <MarketViewWithCandles onSelectedToken={setSelectedToken} setTrendUpdate={handleTrendUpdate} handleOpen={handleOpen} />
          
          <OrdersTypeSwitcher className="central-container-right" selectedToken={selectedToken} open={openOrder} onOpen={handleOpen} />

          <OpenPositions />
    </div>
  );
};


