import * as React from "react";
import Container from "@mui/material/Container";
import { Grid, Divider } from "@mui/material";
import "./StatsPanel.css";

export default function SimpleContainer() {
  return (
    <Container maxWidth="100%" className="container-stats">
      <Grid container>
        <Grid item xs className="grid-item">
          stats 1
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs className="grid-item">
          stats 2
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs className="grid-item">
          stats 3
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs className="grid-item">
          stats 4
        </Grid>
        <Divider orientation="vertical" flexItem />
      </Grid>
    </Container>
  );
}
