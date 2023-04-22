import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SummaryCard(props) {

  return (
    <Paper elevation={3} sx={{ marginTop: "20px", padding: "10px" }}>
      <Typography component="div">
        <Box sx={{ typography: "h3", textAlign: "center" }}>Stressed</Box>
        <br />
        <Box sx={{ typography: "p", textAlign: "center" }}>
          <i>(April 2023 - in work)</i><br />
          This tool performs several transformations and compares multiple failure theories for a
          given stress tensor.</Box>
          <Box sx={{ typography: "p", textAlign: "left" }}>
          <ul >
            <li>Calculates the principal stresses and stress invariants</li>
            <li>Plots Mohr's circle for 2D or 3D stress states</li>
            <li>Calculates Max Shear stress per Tresca criterion</li>
            <li>Calculates von Mises stress</li>
            <li>Compares two methods of determining sign for use with Signed von Mises theory</li>
          </ul>
        </Box>
        <br />
        <Accordion TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id="debug-acc-header">
            <Typography>Instructions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ typography: "subtitle", textAlign: "center" }}>Usage</Box>
            <Box sx={{ typography: "p", textAlign: "left" }}>
              <i>...Instructions for use...</i>
              <br /> <br />
              <b>Input 1:</b> Short summary<br />
              <b>Input 2:</b> ...<br />
            </Box>
            <br />
            <Box sx={{ typography: "subtitle", textAlign: "center" }}>Returns</Box>
            <Box sx={{ typography: "p" }}>
              <i>Summary of outputs</i>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Typography>
    </Paper>
  )
}
