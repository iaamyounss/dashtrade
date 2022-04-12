import * as React from "react";
import { Container, Box } from "@mui/material";
import { FormControl, TextField, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

import { useAuth } from "Context/AuthContext";
import './ViewAdminPage.css'
import { db } from "../../Firebase.js";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },

  table: {
    minWidth: 650,
  },
}));

export default function ViewAdminPage() {
  const classes = useStyles();
  const [inputFields, setImputFields] = React.useState({
    exchange: "",
    publicKey: "",
    privateKey: "",
  });

  const { authUser } = useAuth();

  const [exchanges, setExchanges] = React.useState([
    {
      id: "",
      userID: "",
      exchange: "",
      publicKey: "",
      privateKey: "",
    },
  ]);

  const q = query(
    collection(db, "exchangeID"),
    where("userID", "==", authUser.uid)
  );

  React.useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setExchanges(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          userID: doc.data().userID,
          exchange: doc.data().exchange,
          publicKey: doc.data().publicKey,
          privateKey: doc.data().privateKey,
        }))
      );
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [inputFields]);

  const handleChangeExchange = (event) => {
    const newInputFields = { ...inputFields };
    newInputFields["exchange"] = event.target.value;
    setImputFields(newInputFields);
  };

  const handleChangePublicKey = (event) => {
    const newInputFields = { ...inputFields };
    newInputFields["publicKey"] = event.target.value;
    setImputFields(newInputFields);
  };

  const handleChangePrivateKey = (event) => {
    const newInputFields = { ...inputFields };
    newInputFields["privateKey"] = event.target.value;
    setImputFields(newInputFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "exchangeID"), {
      userID: authUser.uid,
      exchange: inputFields.exchange,
      publicKey: inputFields.publicKey,
      privateKey: inputFields.privateKey,
      timestamp: serverTimestamp(),
    });
    setImputFields({ exchange: "", publicKey: "", privateKey: "" });
  };

  const handleDelete = (id) => {
    deleteDoc(doc(db, "exchangeID", id));
  };

  return (
    <Container className="container">
      <h1>Gestion des exchanges</h1>
      <form>
        <FormControl>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              rowGap: 1,
            }}
          >
            <TextField
              name="exchange"
              label="Exchange"
              variant="filled"
              size="small"
              value={inputFields.exchange}
              onChange={(event) => handleChangeExchange(event)}
            />
            <TextField
              name="publickey"
              label="Public Key"
              variant="filled"
              size="small"
              value={inputFields.publicKey}
              onChange={(event) => handleChangePublicKey(event)}
              fullWidth
            />
            <TextField
              name="privatekey"
              label="Private Key"
              variant="filled"
              size="small"
              value={inputFields.privateKey}
              onChange={(event) => handleChangePrivateKey(event)}
              fullWidth
            />
          </Box>
          <Typography component="div" style={{ height: 10 }} />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            size="medium"
            onClick={handleSubmit}
          >
            Sauvegarder
          </Button>
        </FormControl>
      </form>
      <Typography component="div" style={{ height: 50 }}></Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Exchange</TableCell>
              <TableCell>Public Key</TableCell>
              <TableCell>Private Key</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exchanges.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.exchange}</TableCell>
                <TableCell align="left">{row.publicKey}</TableCell>
                <TableCell align="left">{row.privateKey}</TableCell>
                <TableCell align="left">
                  <DeleteIcon
                    fontSize="large"
                    style={{ opacity: 0.7, cursor: "pointer" }}
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
