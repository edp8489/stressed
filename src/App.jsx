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
import { stateFromSchema } from "./Components/InputsCard.jsx";

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
const resultsSchema = require('./results.schema.json')

export default function App() {
  const [darkMode, toggleDark] = React.useState(false);
  const [calcRequired, toggleCalc] = React.useState(false);
  // const [inputsState, setInputsState] = React.useState(stateFromSchema(inputsSchema));
  
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
 
  
  const calculate = function(e, inputs){
    e.preventDefault()
    toggleCalc(false)


    // calculate principal stresses

    // calculate invariants

    // calculate Max Shear stress

    // calculate von Mises stress
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
          calcRequired={calcRequired}/>
        <MohrsCircle />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
