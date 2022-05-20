import React from "react";
import OpenPositions from "Components/OpenPositions";
import OrdersSwitchLimitMarket from "Components/OrdersSwitchLimitMarket";
import MarketViewWithCandles from "Components/MarketViewWithCandles";
import MarketViewWithCharts from "Components/MarketViewWithCharts";
import Header from "Components/Header";
import { useAuth } from "Services/Auth/AuthContext";
import { useExchange } from "Services/API/ExchangeContext.js";
import { database } from "../../Firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  limit,
} from "firebase/firestore";

export default function Home() {

  const [selectedToken, setSelectedToken] = React.useState("BTCUSDT");
  // ?
  const [dataStats, setDataStats] = React.useState([]);

  const [openOrder, setOpenOrder] = React.useState(false);

  const { setExchange } = useExchange();

  const { authUser } = useAuth();

  const handleOpen = () => {
    setOpenOrder(!openOrder);
  }

  const handleTrendUpdate = (trendData) => {
    setDataStats(trendData);
  };

  const q = query(
    collection(database, "exchangeID"),
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
    <div>
          <Header />

          <MarketViewWithCharts  dataStats={dataStats}  
            selectedToken={selectedToken} 
          />
          
          <MarketViewWithCandles onSelectedToken={setSelectedToken} 
            setTrendUpdate={handleTrendUpdate} 
            handleOpen={handleOpen} 
          />
          
          <OrdersSwitchLimitMarket className="central-container-right"
            selectedToken={selectedToken}
            open={openOrder}
            onOpen={handleOpen}
          />

          <OpenPositions />
    </div>
  );
};


