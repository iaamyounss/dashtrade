import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import GaugeChart from "react-gauge-chart";
import * as stats from "../../../API/statsProvider";
import NumberFormat from "react-number-format";
import "./GlobalStats.css";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import TableContainer from '@mui/material/TableContainer'
//test
import OrdersNav from '../Orders/OrdersNav'

const COLORS = ["#00FF00", "#ff0000"];

const chartStyle = {
  height: 150,
  paddingTop: "20%",
};

export default function GlobalStats({ dataStats, selectedToken }) {
  const [gdfIndex, setGdfIndex] = React.useState(0.5);
  const [globalTrend, setGlobalTrend] = React.useState([]);
  const [tokenTrend, setTokenTrend] = React.useState([]);
  const [tokenData, setTokenData] = React.useState([]);

  // Get the Greed & Fear index from API
  React.useEffect(() => {
    return stats
      .getGreedAndFearIndex()
      .then((response) => setGdfIndex(response));
  }, []);

  // Get the token data from API
  React.useEffect(() => {
    return stats
      .getTokenData(selectedToken)
      .then((response) => setTokenData(response));
  }, [selectedToken]);

  // Compute the Global & Token trend stats
  React.useEffect(() => {
    if (dataStats.length === 0) return;

    const rowSelectedToken = dataStats.find(
      (row) => row.symbol === selectedToken
    );
    const dataTrend = stats.getTrendToken(rowSelectedToken);
    const globalDataTrend = stats.getGlobalTrend(dataStats);

    setGlobalTrend([
      { name: "Green", value: globalDataTrend[0] },
      { name: "Red", value: globalDataTrend[1] },
    ]);
    setTokenTrend([
      { name: "Green", value: dataTrend[0] },
      { name: "Red", value: dataTrend[1] },
    ]);
  }, [dataStats, selectedToken]);

// Stats Panel
return (
<TableContainer component={Paper} style={{display: 'flex'}}>

        <ResponsiveContainer height={300} className="responsiveContainer">
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={25}
            colors={["#ff0000", "#00FF00"]}
            percent={gdfIndex}
            style={chartStyle}
          />
        </ResponsiveContainer>

        <ResponsiveContainer height={300} className="responsiveContainer">
          <PieChart height={100}>
            <Pie
              data={globalTrend}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              label
              dataKey="value"
            >
              {globalTrend.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={300} className="responsiveContainer">
          <PieChart>
            <Pie
              data={tokenTrend}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              label
              dataKey="value"
            >
              {tokenTrend.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer  height={300} className="responsiveContainer">
          <Typography component="div" className="div-stats-market">
            <Paper elevation={5} className="paper">
              <Typography variant="body1" className="paper-item1">
                Market Cap
              </Typography>
              <Typography variant="h4" className="paper-item2">
                <NumberFormat
                  value={Math.round(tokenData.MKTCAP)}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </Typography>
            </Paper>
            <Paper elevation={5} className="paper">
              <Typography variant="body1" className="paper-item1">
                % Price Var (24h)
              </Typography>
              <Typography variant="h4" className="paper-item2">
                <NumberFormat
                  value={Math.round(tokenData.CHANGEPCT24HOUR * 100) / 100}
                  displayType={"text"}
                  suffix={"%"}
                />
              </Typography>
            </Paper>
            <Paper elevation={5} className="paper">
              <Typography variant="body1" className="paper-item1">
                % Price Var (1h)
              </Typography>
              <Typography variant="h4" className="paper-item2">
                <NumberFormat
                  value={Math.round(tokenData.CHANGEPCTHOUR * 100) / 100}
                  displayType={"text"}
                  suffix={"%"}
                />
              </Typography>
            </Paper>
          </Typography>
        </ResponsiveContainer>
        <OrdersNav />
</TableContainer>

  );

}