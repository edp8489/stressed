import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import {light, dark} from "./Components/styles.js";
import {NavBar, Footer} from "./Components/NavBar.jsx";
import SummaryCard from "./Components/SummaryCard.jsx";
import InputsCard from "./Components/InputsCard.jsx";
import ResultsCard from "./Components/ResultsCard.jsx";
import MohrsCircle from "./Components/Mohr.jsx";
import * as mech from "./mechanics.js"

// analytics
import TagManager from 'react-gtm-module'
const tagManagerArgs = {
    gtmId: 'GTM-TTMV4VF'
}
TagManager.initialize(tagManagerArgs)

// defined using let instead of const in case you want to set
// other elements later based on primary/secondary colors
let lightTheme = light
let darkTheme = dark

// uncomment next line to define additional customizations
// theme = createTheme(theme, {**});

// import data files
const inputsSchema = require('./inputs.schema.json')
//const resultsSchema = require('./results.schema.json')

export default function App() {
  const [darkMode, toggleDark] = React.useState(false);
  const [calcRequired, toggleCalc] = React.useState(false);
  const [resultsState, updateResults] = React.useState({
    "stressTensor":{
      "s11":0,
      "s22":0,
      "s33":0,
      "s12":0,
      "s13":0,
      "s23":0
    },
    "vonMisesStress":0,
    "invariants":{
      "I1":0,
      "I2":0,
      "I3": 0
    },
    "principalStresses":{
      "P1":0,
      "P2":0,
      "P3":0
    },
    "maxShearStress":0
  });
  
  let theme = darkMode ? darkTheme : lightTheme;

  // template handleChange function if any state contains a nested object
  /*
  const handleChange = function(e) {
    setState(prevState => {
      return{...prevState, ...{[e.target.name]:e.target.value}}
    })
    e.preventDefault()
  }
  */
 
  
  function calculate(inputs){
    toggleCalc(false)
    //console.log(inputs)
    let stressTensor = mech.toMatrix(inputs)

    // calculate principal stresses
    let principalStresses = mech.principalStresses(stressTensor)
    //console.log(principalStresses)

    // calculate invariants
    let invariants = mech.invariants(stressTensor)

    // calculate Max Shear stress
    let maxShear = mech.tresca(principalStresses.P1, principalStresses.P2, principalStresses.P3)

    // calculate von Mises stress
    let vonMises = mech.vonMises(inputs)

    updateResults({
      "stressTensor": { ...inputs },
      "vonMisesStress": vonMises,
      "invariants": invariants,
      "principalStresses": principalStresses,
      "maxShearStress": maxShear
    })
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="App" sx={{ width: "75%", marginLeft:"12.5%", marginRight:"12.5%" }}>
        <NavBar themeToggle={() => toggleDark( !darkMode )} />
        <SummaryCard />
        <InputsCard 
          sx={{textAlign:"center"}} 
          inputsSchema={inputsSchema}
          changeNotifier={toggleCalc}
          handleSubmit={calculate} />
        <ResultsCard 
          calcRequired={calcRequired}
          results={resultsState} />
        <MohrsCircle {...resultsState.stressTensor} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
