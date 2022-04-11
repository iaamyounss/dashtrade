import React from "react";
import Welcome from "../Components/Dashboard/Welcome"
import ViewCurrentOrders from "Components/Dashboard/CurrentOrders/ViewCurrentOrders";
import OrdersNav from "Components/Dashboard/Orders/OrdersNav";
import SignalTable from "Components/Dashboard/Valorization/GridSignals";
//import StatsPanel from "Components/Dashboard/Market/GlobalStats";
import GlobalStats from "Components/Dashboard/Valorization/GlobalStats";
import ResponsiveHeader from "Components/Header/ResponsiveHeader";
import { useAuth } from "Context/Utils/AuthContext";
import { useExchange } from "Context/Utils/ExchangeContext.js";
import { db } from "../Firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
} from "firebase/firestore";

const Dashboard = () => {
  //select the currency
  const [selectedToken, setSelectedToken] = React.useState("BTCUSDT");
  // ?
  const [dataStats, setDataStats] = React.useState([]);
  // Open the order form to push 
  const [openOrder, setOpenOrder] = React.useState(false);
  // Exchange hook 
  const { setExchange } = useExchange();
  // Authentication hook
  const { authUser } = useAuth();

  const handleOpen = () => {
    setOpenOrder(!openOrder);
  }

  const handleTrendUpdate = (trendData) => {
    setDataStats(trendData);
  };

  const q = query(
    collection(db, "exchangeID"),
    where("userID", "==", authUser.uid),
    limit(1)
  );

  React.useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setExchange(
        snapshot.docs.map((doc) => ({
          exchange: doc.data().exchange,
          publicKey: doc.data().publicKey,
          privateKey: doc.data().privateKey,
        }))
      );
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  // move the signal tables to an alone Route
  // create a checkSignals to see the market currencys that i want
  return (
    <div className="container">
          <ResponsiveHeader />
          <Welcome />
          <GlobalStats 
            dataStats={dataStats} 
            selectedToken={selectedToken} 
          />
          <SignalTable
            onSelectedToken={setSelectedToken}
            setTrendUpdate={handleTrendUpdate}
            handleOpen={handleOpen}
          />
          <OrdersNav
            className="central-container-right"
            selectedToken={selectedToken}
            open={openOrder}
            onOpen={handleOpen}
          />
      <ViewCurrentOrders />
    </div>
  );
};

export default Dashboard;
