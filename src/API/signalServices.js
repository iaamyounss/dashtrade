import griddata from "./griddata.json";

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

export function convertJSON() {
  let array = [];
  let elt;

  for (let i = 0; i < griddata.rows.length; i++) {
    elt = {
      symbol: griddata.rows[i]["symbol"],
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

export function getAllSignals() {
  return convertJSON();
}

export function getColumns() {
  return griddata.columns;
}
