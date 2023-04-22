import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import { stateFromSchema } from "../App";

export default function InputsCard(props) {
  // required props:
  // schema for inputs {inputsSchema}
  const {inputsSchema} = props
  // handleSubmit function {handleSubmit}

  const [inputsState, setInputsState] = React.useState(stateFromSchema(inputsSchema));

  return (
    <Paper elevation={3} sx={{ ...{ marginTop: "10px", marginBottom: "10px", padding: "10px" }, ...props.sx }}>
      <Typography variant="overline" >Inputs</Typography>
      <br />
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={props.handleSubmit}
      >
        <div>
          <FormControl sx={{ margin: "10px" }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  required
                  id="text-input"
                  label="Input Text"
                  type="number"
                  name="fbru"
                // value={props.fbruVal}
                // onChange={props.hdlChg}
                />
              </Grid>
            </Grid>
          </FormControl>
        </div>
        <Button variant="contained" type="submit">Calculate</Button>
      </Box>
    </Paper>
  )
}