import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function SummaryCard(props) {

  return (
    <Paper elevation={3} sx={{ marginTop: "20px", padding: "10px" }}>
      <Typography component="div">
        <Box sx={{ typography: "h3", textAlign: "center" }}>Stressed</Box>
        <br />
        <Box sx={{ typography: "p", textAlign: "center" }}>
          This tool performs several transformations and compares multiple failure theories for a
          given stress tensor.<br /> <br />
          <i>Note: All calculations are performed in your local browser session. No data is sent to an external server.</i>
            
        </Box>
      </Typography>
    </Paper>
  )
}
