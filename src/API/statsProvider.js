import axios from "axios";
import { statsGreedAndFearEndPoint, statsGreedAndFearUrl } from "../config.js";

// Generic function used for API call
async function clientApi(url, endPoint, dataQueryString, method) {
  const queryString = dataQueryString ? "?" + dataQueryString : "";

  const options = {
    url: url + endPoint + queryString,
    method: method,
  };

  return axios(options)
    .then((response) => {
      console.log("Got the response");
      return response;
    })
    .catch((error) => {
      console.log("Debug>>> " + error);
    });
}

// Greed & Fear indicator API call
async function getGreedAndFearIndex() {
  return axios
    .get(`https://api.alternative.me/fng/?limit=1`)
    .then((response) => {
      console.log("Got the API response : Gread & Fear index");
      return response.data.data[0].value / 100;
    })
    .catch((error) => {
      console.log("Debug>>> " + error);
    });
}
// Toke relative market data API call
async function getTokenData(token) {
  let fToken = "";
  let tToken = "";

  if (token.toUpperCase().endsWith("USDT")) {
    fToken = token.replace("USDT", "").toUpperCase();
    tToken = "USDT";
  }
  if (token.toUpperCase().endsWith("BTC")) {
    fToken = token.replace("BTC", "").toUpperCase();
    tToken = "BTC";
  }
  if (token.toUpperCase().endsWith("ETH")) {
    fToken = token.replace("ETH", "").toUpperCase();
    tToken = "ETH";
  }
  if (token.toUpperCase().endsWith("BNB")) {
    fToken = token.replace("BNB", "").toUpperCase();
    tToken = "BNB";
  }
  if (token.toUpperCase().endsWith("USD")) {
    fToken = token.replace("USD", "").toUpperCase();
    tToken = "USD";
  }

  return axios
    .get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fToken}&tsyms=${tToken}`
    )
    .then((response) => {
      //console.log("Got the API response : token market data ");
      //console.log("stats service - token", response.data);
      return response.data.RAW[fToken][tToken];
    })
    .catch((error) => {
      console.log("Debug>>> " + error);
    });
}

// Compute the token trend (Up or Down) from klines data
// stored in the state dataStats auto refreshed in the grid
function getTrendToken(row) {
  let up = 0;
  let down = 0;
  let i = 0;
  for (let [key, value] of Object.entries(row)) {
    for (let [subKey, subValue] of Object.entries(value)) {
      if (subKey === "trend") {
        switch (subValue) {
          case "Up":
            up += 1;
            i += 1;
            break;
          case "Down":
            down += 1;
            i += 1;
            break;
          case null:
            break;
          default:
            break;
        }
      }
    }
  }
  const trendUp = (100 * Math.round((up / i) * 100)) / 100;
  const trendDown = (100 * Math.round((down / i) * 100)) / 100;

  return [trendUp, trendDown];
}

// Get global trend (All grid tokens)
// TODO: check both numbers => sum not equal to 100% sometimes
function getGlobalTrend(array) {
  const ups = [];
  const downs = [];

  for (let i = 0; i < array.length; i++) {
    const res = getTrendToken(array[i]);
    ups.push(res[0]);
    downs.push(res[1]);
  }
  //console.log("ups", ups.length);
  const globalTrendUp = () => ups.reduce((sum, up) => sum + up, 0);

  const globalTrendDown = () => downs.reduce((sum, down) => sum + down, 0);

  const trendUp = Math.round((globalTrendUp() / ups.length) * 100) / 100;
  const trendDown = Math.round((globalTrendDown() / downs.length) * 100) / 100;
  //console.log("up/down trend", ups.length, downs.length);

  return [trendUp, trendDown];
}

export { getGreedAndFearIndex, getTokenData, getTrendToken, getGlobalTrend };
