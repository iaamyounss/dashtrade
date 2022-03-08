import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as signalService from "../../services/signalServices";
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
    color: "#8DFF33",
  },
  down: {
    color: "#F6630F",
  },
}));

const columns = signalService.getColumns();

const rows = signalService.getAllSignals();

export default function SignalTable({ onSelectedToken }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const classes = useStyles();

  const getSelectedRow = (symbol) => {
    return onSelectedToken(symbol);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                    onClick={() => getSelectedRow(row.symbol)}
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
