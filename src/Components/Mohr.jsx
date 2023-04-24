import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import {create, all} from 'mathjs'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const mjsConfig = {
  matrix: 'Array' // Choose 'Matrix' (default) or 'Array'
}
const mjs = create(all, mjsConfig)

const PI = mjs.pi
const THETA = mjs.range(0,2*PI, 0.05)
const XX = mjs.map(THETA, mjs.cos)
const YY = mjs.map(THETA, mjs.sin)

function toChartJSdata(x_data, y_data){
    let dataObj = x_data.map((x_i, index) => {
        let y_i = y_data[index]
        return {
            x: x_i,
            y: y_i
        }

    })
    //console.log(dataObj._data)

    return dataObj

}

// React functional component for 2D Mohr's Circle
function Mohr2D(props) {
    let {s11, s22, s12} = props
    // calculate max shear stress, aka Radius of circle
    let R = mjs.sqrt(mjs.pow(0.5*(s11-s22),2) + mjs.pow(s12,2))
    // calculate average stress, aka origin of circle
    let Savg = 0.5*(s11+s22)

    // Scale and shift X and Y coordinates using R and Savg
    let X = XX.map((x_i)=>{return(R*(x_i - Savg))})

    let Y = YY.map((y_i)=>{return(R*(y_i))})
    //console.log(Y[0])
    
    // chartjs options
    const options = {
        responsive: true,
        type:"line",
        plugins: {
          title: {
            display: true,
            text: "Mohr's Circle for 2D Plane Stress",
          },
          legend:{
            display:false
          }
        },
      };

      let cjsData = {
        labels:THETA,
        datasets:[
            {
                label:"2D Plane Stress",
            data:toChartJSdata(XX, YY)}
        ]}

    return(
        <Box><Line options={options} data={cjsData} /></Box>
    )
}


// React component for 3D Mohr's Circle
// @TODO
function Mohr3D(props) {


    return(
        <Box>TBD</Box>
    )

}

export default function MohrsCircle(props) {
    const {s11, s22, s33, s12, s23, s13} = props

    // TODO - logic to return 2D or 3D Mohr based on inputs
    const is3D = (s13 == 0 && s23 == 0 && s33 == 0)
    // <Mohr2D s11={s11} s22={s22} s12={s12} />
    return (
        <Paper elevation={3} sx={{ padding: "10px", textAlign: "center" }}>
            <Typography variant="overline">Mohr's Circle</Typography><br />
            <i>in work</i>
        </Paper>
    )
}