import React from "react";
import OrdersPanel from "Components/Dashboard/Positions/PanelOrders";
import OrdersNav from "Components/Dashboard/Orders/OrdersNav";
import SignalTable from "Components/Dashboard/Market/GridSignals";
//import StatsPanel from "Components/Dashboard/Market/GlobalStats";
import GlobalStats from "Components/Dashboard/Market/GlobalStats";
import Header from "../Components/Header/Header";

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
  const [selectedToken, setSelectedToken] = React.useState("BTCUSDT");
  const [dataStats, setDataStats] = React.useState([]);
  const { setExchange } = useExchange();
  const { authUser } = useAuth();

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

  return (
    <div className="container">
      
          <Header />
          <GlobalStats dataStats={dataStats} selectedToken={selectedToken} />
          <SignalTable
            onSelectedToken={setSelectedToken}
            setTrendUpdate={handleTrendUpdate}
          />
          <OrdersNav
            className="central-container-right"
            selectedToken={selectedToken}
          />
      <OrdersPanel />
    </div>
  );
};

export default Dashboard;
