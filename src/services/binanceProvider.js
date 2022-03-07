import crypto from "crypto-js";
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
} from "../config.js";

const apiKeys = { APIKEY, APISECRET };

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
      console.log("Got the response");
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

export {
  getLastPriceToken,
  getAccountBalances,
  getAllOrdersByToken,
  getAllPositionsByToken,
  sendOrder,
};
