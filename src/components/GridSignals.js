import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as signalService from "./../API/signalServices";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { blueGrey } from "@mui/material/colors";

const useStyles = makeStyles((theme) => ({
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    //color: theme.palette.getContrastText(theme.palette.primary.dark),
    color: blueGrey[200],
    fontFamily: "Roboto",
  },
  up: {
    //color: "#8DFF33",
    color: "#00FF00",
  },
  down: {
    //color: "#F6630F",
    color: "#ff0000",
  },

  tableRow: {
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "purple",
      "& > .MuiTableCell-root": {
        color: "yellow",
      },
    },
  },
}));

const columns = signalService.getColumns();

export default function SignalTable({ onSelectedToken, setTrendUpdate }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [rows, setRows] = React.useState([]);
  const [trendData, setTrendData] = React.useState([]);
  const [listTokens, setListToken] = React.useState([]);
  const [minutes, setMinutes] = React.useState(1);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const classes = useStyles();

  const getSelectedRow = (symbol) => {
    return onSelectedToken(symbol);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleTrendUpdate = (rows) => {
    setTrendUpdate(rows);
  };

  // Get the Signals and the corresponding token list
  React.useEffect(() => {
    const signals = signalService.getAllSignals();
    setRows(signals);
    const tokens = signalService.getListToken(signals);
    setListToken(tokens);
  }, []);

  // Auto refresh timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setMinutes(minutes + 1);
    }, 120000);
    return () => clearInterval(timer);
  }, [minutes]);

  // API call to get the current trend data
  React.useEffect(() => {
    signalService
      .updateTrends(listTokens.slice(0, 50), [
        "15m",
        "30m",
        "1h",
        "2h",
        "4h",
        "6h",
        "8h",
        "12h",
        "1d",
        "3d",
        "1w",
      ])
      .then((response) => setTrendData(response));
    //.then((response) => console.log("signalTable", response));
  }, [listTokens, minutes]);

  // Merge the existing grid with new trend data from API
  React.useEffect(() => {
    if (rows.length === 0) {
      console.log("signalTable - No Rows");
      return;
    }
    // Merge
    const newRows = rows.map((row, index) => {
      const trendDataRow = trendData[index];
      return trendDataRow
        ? {
            symbol: trendDataRow.symbol,
            M15: { signal: row.M15.signal, trend: trendDataRow.M15.trend },
            M30: { signal: row.M30.signal, trend: trendDataRow.M30.trend },
            H1: { signal: row.H1.signal, trend: trendDataRow.H1.trend },
            H2: { signal: row.H2.signal, trend: trendDataRow.H2.trend },
            H4: { signal: row.H4.signal, trend: trendDataRow.H4.trend },
            H6: { signal: row.H6.signal, trend: trendDataRow.H6.trend },
            H8: { signal: row.H8.signal, trend: trendDataRow.H8.trend },
            H12: { signal: row.H12.signal, trend: trendDataRow.H12.trend },
            D1: { signal: row.D1.signal, trend: trendDataRow.D1.trend },
            D3: { signal: row.D3.signal, trend: trendDataRow.D3.trend },
            W1: { signal: row.W1.signal, trend: trendDataRow.W1.trend },
          }
        : { ...row };
    });
    //console.log("signalTable-All trendData", trendData);
    setRows(newRows);
    handleTrendUpdate(newRows);
  }, [trendData]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 1800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                  //className={classes.tableHeaderCell}
                >
                  {column.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.symbol}
                    onClick={() => {
                      getSelectedRow(row.symbol);
                      setSelectedRow(row.symbol);
                    }}
                    selected={selectedRow === row.symbol}
                  >
                    {columns.map((column, index) => {
                      //const value = row[column.id];
                      return (
                        <TableCell key={index} align="center">
                          <Grid container>
                            <Grid item lg={10}>
                              {column === "symbol"
                                ? row[column]
                                : row[column].signal}
                            </Grid>
                            <Grid item lg={2}>
                              {column === "symbol" ? null : String(
                                  row[column].trend
                                ).match("[Up]") ? (
                                <ArrowCircleUpIcon className={classes.up} />
                              ) : String(row[column].trend).match("[Down]") ? (
                                <ArrowCircleDownIcon className={classes.down} />
                              ) : null}
                            </Grid>
                          </Grid>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
