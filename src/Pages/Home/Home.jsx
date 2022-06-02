import React from "react";
import OpenPositions from "Components/OpenPositions";
import OrdersTypeSwitcher from "Sections/Orders/OrdersTypeSwitcher";
import MarketViewWithCandles from "Components/MarketViewWithCandles";
import MarketViewWithCharts from "Components/MarketViewWithCharts";
import Header from "Sections/Home/Header";
// import HeaderAdmin from "Sections/Admin/HeaderAdmin";
// import HeaderNavigation from 'Sections/Home/HeaderNavigation';
// import Sidebar from 'Components/Sidebar';


export default function Home() {

//  a remettre lorsque t'auras du temps pour retaper la navigation
// const [open, setOpen] = React.useState(true);
// <Header onOpenSideBar={() => setOpen(true)} />
// <Sidebar
//   isOpenSidebar={open}
//   onCloseSidebar={() => setOpen(false)}
//   navigation={<HeaderNavigation />} />
const [selectedToken, setSelectedToken] = React.useState("BTCUSDT");
// ?
const [dataStats, setDataStats] = React.useState([]);

const [openOrder, setOpenOrder] = React.useState(false);


const handleOpen = () => {
  setOpenOrder(!openOrder);
}

const handleTrendUpdate = trendData => {
  setDataStats(trendData)
}

  return (
    <div>
      <Header />

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


