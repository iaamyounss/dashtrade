import CryptoJS from "crypto-js";
import axios from "axios";
import {
  APIKEY,
  APISECRET,
  bfAccountBalanceEndPoint,
  bfAllOrdersEndPoint,
  bUrl,
  bfPositionsendPoint,
  bfOrderEndPoint,
  bfPriceEndPoint,
  bfKlinesEndPoint,
} from "../../config.js";

const apiKeys = { APIKEY, APISECRET };

// Generic function used for GET API unsigned call
async function clientGetApiBinance(url, endPoint, dataQueryString) {
  const urlString = url + endPoint + dataQueryString;

  return axios
    .get(urlString)
    .then((response) => {
      console.log("Got the response");
      return response;
    })
    .catch((error) => {
      console.log("Debug>>> " + error);
    });
}

// Generic function used for API call
async function clientApiSignedBinance(
  url,
  endPoint,
  dataQueryString,
  apiKeys,
  method
) {
  const signature = crypto
    .HmacSHA256(dataQueryString, apiKeys.APISECRET)
    .toString(crypto.enc.Hex);

  const options = {
    url: url + endPoint + "?" + dataQueryString + "&signature=" + signature,
    method: method,
    headers: {
      "X-MBX-APIKEY": apiKeys.APIKEY,
    },
  };

  return axios(options)
    .then((response) => {
      console.log("Got the response API Signed");
      return response;
    })
    .catch((error) => {
      console.log("Debug>>> " + error);
    });
}

// Get the last price for one Token
async function getLastPriceToken(token) {
  const dataQueryString =
    `symbol=${token}&recvWindow=20000&timestamp=` + Date.now();

  return clientApiSignedBinance(
    bUrl,
    bfPriceEndPoint,
    dataQueryString,
    apiKeys,
    "GET"
  );
}

// Get the available balances for the current account
async function getAccountBalances() {
  const dataQueryString = "recvWindow=20000&timestamp=" + Date.now();

  return clientApiSignedBinance(
    bUrl,
    bfAccountBalanceEndPoint,
    dataQueryString,
    apiKeys,
    "GET"
  );
}

// Get all orders for one token
async function getAllOrdersByToken(token) {
  const dataQueryString =
    `symbol=${token}&recvWindow=20000&timestamp=` + Date.now();

  return clientApiSignedBinance(
    bUrl,
    bfAllOrdersEndPoint,
    dataQueryString,
    apiKeys,
    "GET"
  );
}

// Get all opened positions for one token
async function getAllPositionsByToken(token) {
  const dataQueryString =
    `symbol=${token}&recvWindow=20000&timestamp=` + Date.now();

  return clientApiSignedBinance(
    bUrl,
    bfPositionsendPoint,
    dataQueryString,
    apiKeys,
    "GET"
  );
}

// Send order function
async function sendOrder(
  token,
  side,
  type,
  timeInForce = "GTC",
  quantity,
  price
) {
  const dataQueryString =
    `symbol=${token}&side=${side}&type=${type}&timeInForce=${timeInForce}&quantity=${quantity}&price=${price}&recvWindow=20000&timestamp=` +
    Date.now();

  return clientApiSignedBinance(
    bUrl,
    bfOrderEndPoint,
    dataQueryString,
    apiKeys,
    "POST"
  );
}

// Delete order function - Need Token and existing orderId & origClientOrderId for the order we want to close/delete
async function closeOrder(token, orderId, origClientOrderId) {
  const dataQueryString =
    `symbol=${token}&orderId=${orderId}&origClientOrderId=${origClientOrderId}&recvWindow=20000&timestamp=` +
    Date.now();

  return clientApiSignedBinance(
    bUrl,
    bfOrderEndPoint,
    dataQueryString,
    apiKeys,
    "DELETE"
  );
}

// Get the last candle data for one Token
async function getHistoCandleToken(token, interval, limit) {
  const dataQueryString = `?symbol=${token}&interval=${interval}&limit=${limit}`;
  try {
    const lastCandle = await clientGetApiBinance(
      bUrl,
      bfKlinesEndPoint,
      dataQueryString
    );
    return { interval: interval, candle: lastCandle.data[0] };
  } catch {
    throw Error("getHistoCandleToken failed");
  }
}

// Get trend one toke and a list of interval
// ["15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h","1d","3d","1w"]
// Open time, Open, High, Low, Close (or latest price), Volume, Close time, Quote asset volume,
// ...Number of trades, Taker buy volume, Taker buy quote asset volume, Ignore.
async function getTrendTokenInterval(token, intervals) {
  try {
    const results = await Promise.all(
      intervals.map((interval) => getHistoCandleToken(token, interval, 1))
    );
    const data = await results.map((result) => {
      const trd =
        parseFloat(result.candle[4] - parseFloat(result.candle[1])) > 0.0
          ? "Up"
          : "Down";
      return { interval: result.interval, trend: trd };
    });

    return data;
  } catch {
    throw Error("getTrendTokenInterval all failed");
  }
}

export {
  getLastPriceToken,
  getAccountBalances,
  getAllOrdersByToken,
  getAllPositionsByToken,
  sendOrder,
  closeOrder,
  getHistoCandleToken,
  getTrendTokenInterval,
};
