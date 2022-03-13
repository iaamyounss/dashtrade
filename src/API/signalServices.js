import griddata from "./griddata.json";
import * as binance from "./Binance/binanceProvider";

// Split griddata element in two objects : signal (list) and trend [up or down]
function buildObject(index, col) {
  return String(griddata.rows[index][col]).includes("[Up]")
    ? {
        signal: String(griddata.rows[index][col]).replace("[Up]", ""),
        trend: "Up",
      }
    : String(griddata.rows[index][col]).includes("[Down]")
    ? {
        signal: String(griddata.rows[index][col]).replace("[Down]", ""),
        trend: "Down",
      }
    : { signal: griddata.rows[index][col], trend: null };
}

// Regenerate the griddata in the new format : signal and trend object
function convertJSON() {
  let array = [];
  let elt;

  for (let i = 0; i < griddata.rows.length; i++) {
    elt = {
      symbol: griddata.rows[i]["symbol"].replace("/", ""),
      M15: buildObject(i, "M15"),
      M30: buildObject(i, "M30"),
      H1: buildObject(i, "H1"),
      H2: buildObject(i, "H2"),
      H4: buildObject(i, "H4"),
      H6: buildObject(i, "H6"),
      H8: buildObject(i, "H8"),
      H12: buildObject(i, "H12"),
      D1: buildObject(i, "D1"),
      D3: buildObject(i, "D3"),
      W1: buildObject(i, "W1"),
    };

    array.push(elt);
  }
  return array;
}

// Get all signals (signals + trends)
function getAllSignals() {
  //console.log("grid-data", convertJSON());
  return convertJSON();
}

// List of columns to display in the grid
function getColumns() {
  return [
    "symbol",
    "M15",
    "M30",
    "H1",
    "H12",
    "H2",
    "H4",
    "H6",
    "H8",
    "D1",
    "D3",
    "W1",
  ];
}

function getListToken(arrayObj) {
  const symbols = arrayObj.map((item) => item.symbol.replace("/", ""));
  return symbols;
}

// Get trend via API for one token and a list of interval ["15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h","1d","3d","1w"]
// response : Open time, Open, High, Low, Close (or latest price), Volume, Close time, Quote asset volume,
// ...Number of trades, Taker buy volume, Taker buy quote asset volume, Ignore.
async function getTrendForTokenIntervals(token, intervals) {
  try {
    const results = await Promise.all(
      intervals.map((interval) =>
        binance.getHistoCandleToken(token, interval, 1)
      )
    );
    const data = await results.map((result) => {
      const trd =
        parseFloat(result.candle[4] - parseFloat(result.candle[1])) > 0.0
          ? "Up"
          : "Down";
      return { symbol: token, interval: result.interval, trend: trd };
    });

    return data;
  } catch {
    throw Error("getTrendTokenInterval all failed");
  }
}

// Get trend via API for a list of tokens and a list of intervals
async function getTrendForTokensIntervals(tokens, intervals) {
  try {
    const results = await Promise.all(
      tokens.map((token) => getTrendForTokenIntervals(token, intervals, 1))
    );
    return results;
  } catch {
    throw Error("getTrendForTokensIntervals all failed");
  }
}

// Format the output from API to prepare the merge with the signal grid data
// TODO: check if this can be done before in the getTrendForTokenIntervals function
function convertTrendObjectArray(objectArray) {
  let newObjectArray = [];

  for (let i = 0; i < objectArray.length; i++) {
    let row = { symbol: objectArray[i][0].symbol };

    for (let j = 0; j < objectArray[i].length; j++) {
      switch (objectArray[i][j].interval) {
        case "15m":
          row = { ...row, M15: { trend: objectArray[i][j].trend } };
          break;
        case "30m":
          row = { ...row, M30: { trend: objectArray[i][j].trend } };
          break;
        case "1h":
          row = { ...row, H1: { trend: objectArray[i][j].trend } };
          break;
        case "2h":
          row = { ...row, H2: { trend: objectArray[i][j].trend } };
          break;
        case "4h":
          row = { ...row, H4: { trend: objectArray[i][j].trend } };
          break;
        case "6h":
          row = { ...row, H6: { trend: objectArray[i][j].trend } };
          break;
        case "8h":
          row = { ...row, H8: { trend: objectArray[i][j].trend } };
          break;
        case "12h":
          row = { ...row, H12: { trend: objectArray[i][j].trend } };
          break;
        case "1d":
          row = { ...row, D1: { trend: objectArray[i][j].trend } };
          break;
        case "3d":
          row = { ...row, D3: { trend: objectArray[i][j].trend } };
          break;
        case "1w":
          row = { ...row, W1: { trend: objectArray[i][j].trend } };
          break;
        default:
          row = "";
      }
    }
    newObjectArray.push(row);
    row = {};
  }

  return newObjectArray;
}

async function updateTrends(tokens, intervals) {
  try {
    const results = await getTrendForTokensIntervals(tokens, intervals);

    return convertTrendObjectArray(results);
  } catch {
    throw Error("getTrendForTokensIntervals all failed");
  }
}

export {
  convertJSON,
  getAllSignals,
  getColumns,
  getTrendForTokensIntervals,
  convertTrendObjectArray,
  updateTrends,
  getListToken,
};
