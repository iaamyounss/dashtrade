import React from "react";
import OrdersPanel from "components/PanelOrders";
import OrdersNav from "components/OrdersNav";
import CssBaseline from "@mui/material/CssBaseline";
import SignalTable from "components/GridSignals";
import StatsPanel from "components/GlobalStats";
import Header from "../components/Header";

import { useAuth } from "context/utils/AuthContext";
import { useExchange } from "context/utils/ExchangeContext.js";
import { db } from "../Firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
} from "firebase/firestore";

const Accueil = () => {
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
      <CssBaseline />
      <div className="central-container">
        <div className="central-container-left">
          <Header />
          <StatsPanel dataStats={dataStats} selectedToken={selectedToken} />
          <SignalTable
            onSelectedToken={setSelectedToken}
            setTrendUpdate={handleTrendUpdate}
          />
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
