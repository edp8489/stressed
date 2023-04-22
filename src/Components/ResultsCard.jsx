import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";


export default function ResultsCard(props) {
  // destructure props
  const { readyToCalc, vonMisesStress, stressInvariants, principalSresses } = props;
  return (
    <Paper elevation={3} sx={{ padding: "10px", textAlign: "center" }}>
      <Typography variant="overline">Results</Typography><br />
      <span>{readyToCalc ?
        "Success message" :
        "User input required. Press 'Calculate' when ready"}
      </span>
      <ul>
        <li><b>von Mises stress:</b> {}</li>
        </ul>
    </Paper>
  )
}