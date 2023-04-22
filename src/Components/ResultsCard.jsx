import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';


export default function ResultsCard(props) {
  // destructure props
  const { calcRequired, vonMisesStress, stressInvariants, principalSresses } = props;
  return (
    <Paper elevation={3} sx={{ ...{ marginTop: "10px", marginBottom: "10px", padding: "10px", textAlign:"center" }, ...props.sx }}>
      <Typography variant="overline">Results</Typography><br />
      <span>{calcRequired ?
        "User inputs changed. Press 'Calculate' when ready" :
        ""}
      </span>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <b>Principal Stresses</b><br />
          Major (P<sub>1</sub>): blah<br />
          Middle (P<sub>2</sub>): blah<br />
          Minor (P<sub>3</sub>): blah
        </Grid>
        <Grid item xs={4}>
          <b>Invariants</b><br />
          I<sub>1</sub>: blah<br />
          I<sub>2</sub>: blah<br />
          I<sub>3</sub>: blah
        </Grid>
        <Grid item xs={4}>
          <b>von Mises stress</b><br />
          S<sub>vm</sub>: blah<br />
          Sign (using |P<sub>1</sub>| ? |P<sub>3</sub>|): blah<br />
          Sign (using I<sub>1</sub>): blah
        </Grid>
      </Grid>
    </Paper>
  )
}