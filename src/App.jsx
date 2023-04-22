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

export function stateFromSchema(schema){
  const DEFAULTS = {
    "number":0,
    "string":"",
    "boolean":false
  }
  // create array of property names from schema
  // check if default value is set in schema, otherwise fill in from fallback DEFAULTS
  // return array of [[key, defaultValue], ...] pairs 
  let properties = Object.keys(schema.properties).map((key) => {
    let type = schema.properties[key].type
    let defaultValue = "default" in schema.properties[key] ? schema.properties[key].default : DEFAULTS[type]
    return [key, defaultValue]
  })

  // create initial state from properties pairs
  const initialState = Object.fromEntries(properties)
  //console.log("initial state")
  //console.log(initialState)

  return initialState
}

// generate lists for select menu
// const selDisp = appData["tbd"].map(x=>mathUtils.selectFormat(x.metadata))
// const selVal = appData["tbd"].map(x=>x.metadata.id)

export default function App() {
  const [darkMode, toggleDark] = React.useState(false);
  const [readyToCalc, setReady] = React.useState(false);
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
 
  
  const calculate = function(e){
    e.preventDefault()

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
          handleSubmit={calculate} />
        <ResultsCard />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
