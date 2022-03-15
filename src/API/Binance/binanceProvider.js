import CryptoJS from "crypto-js";
import axios from "axios";
import {
  //APIKEY,
  //APISECRET,
  bfAccountBalanceEndPoint,
  bfAllOrdersEndPoint,
  bUrl,
  bfPositionsendPoint,
  bfOrderEndPoint,
  bfPriceEndPoint,
  bfKlinesEndPoint,
} from "../../config.js";

//const apiKeys = { APIKEY, APISECRET };

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
  apiKeys,
  url,
  endPoint,
  dataQueryString,
  method
) {
  const signature = CryptoJS.HmacSHA256(
    dataQueryString,
    apiKeys.APISECRET
  ).toString(CryptoJS.enc.Hex);
  const proxy = "https://calm-caverns-53376.herokuapp.com/";
  const options = {
    url:
      proxy +
      url +
      endPoint +
      "?" +
      dataQueryString +
      "&signature=" +
      signature,
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
    `?symbol=${token}&recvWindow=20000&timestamp=` + Date.now();

  return clientGetApiBinance(
    bUrl,
    bfPriceEndPoint,
    dataQueryString,
    "GET"
  );
}

// Get the available balances for the current account
async function getAccountBalances(apiKeys) {
  const dataQueryString = "recvWindow=20000&timestamp=" + Date.now();

  return clientApiSignedBinance(
    apiKeys,
    bUrl,
    bfAccountBalanceEndPoint,
    dataQueryString,
    "GET"
  );
}

// Get all orders for one token
async function getAllOrdersByToken(apiKeys, token) {
  const dataQueryString =
    `symbol=${token}&recvWindow=20000&timestamp=` + Date.now();

  return clientApiSignedBinance(
    apiKeys,
    bUrl,
    bfAllOrdersEndPoint,
    dataQueryString,
    "GET"
  );
}

// Get all opened positions for one token
async function getAllPositionsByToken(apiKeys, token) {
  const dataQueryString =
    `symbol=${token}&recvWindow=20000&timestamp=` + Date.now();

  return clientApiSignedBinance(
    apiKeys,
    bUrl,
    bfPositionsendPoint,
    dataQueryString,
    "GET"
  );
}

// Send order function
async function sendOrder(
  apiKeys,
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
    apiKeys,
    bUrl,
    bfOrderEndPoint,
    dataQueryString,
    "POST"
  );
}

// Delete order function - Need Token and existing orderId & origClientOrderId for the order we want to close/delete
async function closeOrder(apiKeys, token, orderId, origClientOrderId) {
  const dataQueryString =
    `symbol=${token}&orderId=${orderId}&origClientOrderId=${origClientOrderId}&recvWindow=20000&timestamp=` +
    Date.now();

  return clientApiSignedBinance(
    apiKeys,
    bUrl,
    bfOrderEndPoint,
    dataQueryString,
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
