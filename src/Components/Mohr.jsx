import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { create, all } from 'mathjs'
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
import { Scatter } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.font.size = 16

// configure MathJS to return Arrays rather than Matrix objects
const mjsConfig = {
    matrix: 'Array' // Choose 'Matrix' (default) or 'Array'
}
const mjs = create(all, mjsConfig)

const PI = mjs.pi
const THETA = mjs.range(0, 2 * PI + .05, 0.05)
const XX = mjs.map(THETA, mjs.cos)
const YY = mjs.map(THETA, mjs.sin)

function toChartJSdata(x_data, y_data) {
    let dataObj = x_data.map((x_i, index) => {
        let y_i = y_data[index]
        return {
            x: x_i,
            y: y_i
        }

    })
    return dataObj
}

// React functional component for 2D Mohr's Circle
function Mohr2D(props) {
    let { s11, s22, s12 } = props
    // calculate max shear stress, aka Radius of circle
    let R = mjs.sqrt(mjs.pow(0.5 * (s11 - s22), 2) + mjs.pow(s12, 2))
    //console.log("R:")
    //console.log(R)

    // calculate average stress, aka origin of circle
    let Savg = mjs.evaluate("0.5*(s11+s22)", { s11: s11, s22: s22 })
    //console.log("S11")
    // console.log(s11)
    // console.log("S22")
    // console.log(s22)
    // console.log("Savg")
    // console.log(Savg)

    // Scale and shift X and Y coordinates using R and Savg
    let X = XX.map((x_i) => { return (R * (x_i) + Savg) })
    // console.log(X)

    let Y = YY.map((y_i) => { return (R * (y_i)) })
    // console.log(Y)

    // chartjs options
    const options = {
        responsive: true,
        aspectRatio: 1,
        maintainAspectRatio: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Normal Stress'
                },
                position: "center"
            },
            y: {
                title: {
                    display: true,
                    text: 'Shear Stress'
                },
                position: "left"
            }
        },
        plugins: {
            title: {
                display: true,
                text: "Mohr's Circle for 2D Plane Stress",
            },
            legend: {
                display: false
            }
        },
    };

    let cjsData = {
        datasets: [
            {
                showLine: true,
                borderColor: "#4e79a7",
                pointRadius: 2,
                data: toChartJSdata(X, Y)
            }
        ]
    }

    return (
        <Scatter options={options} data={cjsData} />
    )
}


// React component for 3D Mohr's Circle
// @TODO
function Mohr3D(props) {


    return (
        <Box><i>Sorry, 3D component still in work</i></Box>
    )

}

export default function MohrsCircle(props) {
    const { s11, s22, s33, s12, s23, s13 } = props

    // TODO - logic to return 2D or 3D Mohr based on inputs
    const is2D = (s13 == 0 && s23 == 0 && s33 == 0)

    const Mohr = is2D ?
        <Mohr2D s11={s11} s22={s22} s12={s12} /> :
        <Mohr3D />
        
    return (
        <Paper elevation={3} sx={{ padding: "10px", textAlign: "center" }}>
            <Typography variant="overline">Mohr's Circle</Typography><br />
            {Mohr}
        </Paper>
    )
}