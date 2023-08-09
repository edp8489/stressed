import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';

export function stateFromSchema(schema){
  // @TODO add recursion for nested objects
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

  // create initial state from array of properties pairs
  const initialState = Object.fromEntries(properties)
  //console.log("initial state")
  //console.log(initialState)

  return initialState
}

function inputsFromSchema(schema, state, changeNotifierFunction, onChangeFunction){
  const names = Object.keys(schema.properties)

  const fieldsArray = names.map((n) => {
    const id = n + "-text-input"
    const label = "Stress " + n
    return (<Grid item xs={4} key={id}>
                <TextField
                  required
                  id={id}
                  label={label}
                  type="number"
                  name={n}
                  value={state[n]}
                  onChange={(e) => {
                    changeNotifierFunction(true)
                    onChangeFunction({...state, ...{[e.target.name]:e.target.value}})}}
                />
              </Grid>)
  })
  return(fieldsArray)
}

export default function InputsCard(props) {
  // required props:
  // schema for inputs {inputsSchema}
  const {inputsSchema} = props
  // handleSubmit function {handleSubmit}
  const {handleSubmit} = props
  // change notifier function
  const {changeNotifier} = props

  const [inputsState, setInputsState] = React.useState(stateFromSchema(inputsSchema));
  const inputFields = inputsFromSchema(inputsSchema, inputsState, changeNotifier, setInputsState)

  return (
    <Paper elevation={3} sx={{ ...{ marginTop: "10px", marginBottom: "10px", padding: "10px" }, ...props.sx }}>
      <Typography variant="overline" >Inputs</Typography>
      <br />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(inputsState)
        }}
      >
        <div>
          <FormControl sx={{ margin: "10px" }}>
            <Grid container spacing={2} direction="row" justifyContent="space-evenly" alignItems="center" >
              {inputFields} 
            </Grid>
          </FormControl>
        </div>
        <Button variant="contained" type="submit">Calculate</Button>
      </Box>
    </Paper>
  )
}