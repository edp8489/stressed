import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import {abs, sign, round} from 'mathjs'


export default function ResultsCard(props) {
  // destructure props
  const { calcRequired, results } = props;
  const {vonMisesStress, maxShearStress, invariants, principalStresses} = results
  return (
    <Paper elevation={3} sx={{ ...{ marginTop: "10px", marginBottom: "10px", padding: "10px", textAlign:"center" }, ...props.sx }}>
      <Typography variant="overline">Results</Typography><br />
      <span style={{color:"red"}}>{calcRequired ?
        "User inputs changed. Press 'Calculate' when ready" :
        ""}
      </span>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <b>Principal Stresses</b><br />
          Major (P<sub>1</sub>): {round(principalStresses.P1,3)}<br />
          Middle (P<sub>2</sub>): {round(principalStresses.P2,3)}<br />
          Minor (P<sub>3</sub>): {round(principalStresses.P3,3)}
        </Grid>
        <Grid item xs={4}>
          <b>Invariants</b><br />
          I<sub>1</sub>: {invariants.I1}<br />
          I<sub>2</sub>: {invariants.I2}<br />
          I<sub>3</sub>: {invariants.I3}
        </Grid>
        <Grid item xs={4}>
          <b>von Mises stress</b><br />
          S<sub>vm</sub>: {round(vonMisesStress,3)}<br />
          Sign (using |P<sub>1</sub>| ? |P<sub>3</sub>|): {abs(principalStresses.P3) > abs(principalStresses.P1)? -1: 1}<br />
          Sign (using I<sub>1</sub>): {sign(invariants.I1)}
        </Grid>
      </Grid>
    </Paper>
  )
}