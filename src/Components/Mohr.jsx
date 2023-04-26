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
import { useTheme } from '@mui/material/styles';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const tableau10Hex = {
    blue: "#5778a4",
    orange: "#e49444",
    red: "#d1615d",
    teal: "#85b6b2",
    green: "#6a9f58",
    yellow: "#e7ca60",
    purple: "#a87c9f",
    pink: "#f1a2a9",
    brown: "#967662",
    grey: "#b8b0ac"
}

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
    var { s11, s22, s12 } = props
    // calculate max shear stress, aka Radius of circle
    var R = mjs.sqrt(mjs.pow(0.5 * (s11 - s22), 2) + mjs.pow(s12, 2))
    //console.log("R:")
    //console.log(R)

    // calculate average stress, aka origin of circle
    var Savg = mjs.evaluate("0.5*(s11+s22)", { s11: s11, s22: s22 })
    //console.log("S11")
    // console.log(s11)
    // console.log("S22")
    // console.log(s22)
    // console.log("Savg")
    // console.log(Savg)

    // Scale and shift X and Y coordinates using R and Savg
    var X = XX.map((x_i) => { return (R * (x_i) + Savg) })
    // console.log(X)

    var Y = YY.map((y_i) => { return (R * (y_i)) })
    // console.log(Y)

    // set X and Y bounds to remain square
    var ymax = (R == 0)? 1 : mjs.ceil(1.1*R)
    var ymin = (R == 0)? -1 : mjs.floor(-1.1*R)
    var xmax = (R == 0)? 1 : mjs.ceil(Savg + 1.1*R)
    var xmin = (R == 0)? -1 : mjs.floor(Savg -1.1*R)


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
                position: "center",
                min: xmin,
                max: xmax
            },
            y: {
                title: {
                    display: true,
                    text: 'Shear Stress'
                },
                position: "left",
                min: ymin,
                max: ymax
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

    var cjsData = {
        datasets: [
            {
                showLine: true,
                borderColor: tableau10Hex["blue"],
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
function Mohr3D(props) {
    const {P1, P2, P3} = props

    // calculate radii and centers for 3 circles
    var R1 = 0.5*(P2 - P3)
    var center1 = 0.5*(P2 + P3)

    var R2 = 0.5*(P1 - P3)
    var center2 = 0.5*(P1 + P3)

    var R3 = 0.5*(P1 - P2)
    var center3 = 0.5*(P1 + P2)

    // Scale and shift X and Y coordinates using R# and center#
    var X1 = XX.map((x_i) => { return (R1 * (x_i) + center1) })
    var Y1 = YY.map((y_i) => { return (R1 * (y_i)) })
    var X2 = XX.map((x_i) => { return (R2 * (x_i) + center2) })
    var Y2 = YY.map((y_i) => { return (R2 * (y_i)) })
    var X3 = XX.map((x_i) => { return (R3 * (x_i) + center3) })
    var Y3 = YY.map((y_i) => { return (R3 * (y_i)) })

    // calculate axis scale
    var ymax = (R2 == 0)? 1 : mjs.ceil(1.1*R2)
    var ymin = (R2 == 0)? -1 : mjs.floor(-1.1*R2)
    var xmax = (R2 == 0)? 1 : mjs.ceil(center2 + 1.1*R2)
    var xmin = (R2 == 0)? -1 : mjs.floor(center2 -1.1*R2)

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
                position: "center",
                min: xmin,
                max: xmax
            },
            y: {
                title: {
                    display: true,
                    text: 'Shear Stress'
                },
                position: "left",
                min: ymin,
                max: ymax
            }
        },
        plugins: {
            title: {
                display: true,
                text: "Mohr's Circle for 3D Stress State",
            },
            legend: {
                display: true
            }
        },
    };

    var cjsData = {
        datasets: [
            {
                showLine: true,
                borderColor: tableau10Hex["blue"],
                pointRadius: 2,
                data: toChartJSdata(X1, Y1),
                label:"P2-P3"
            },
            {
                showLine: true,
                borderColor: tableau10Hex["teal"],
                pointRadius: 2,
                data: toChartJSdata(X2, Y2),
                label:"P1-P3"
            },
            {
                showLine: true,
                borderColor: tableau10Hex["red"],
                pointRadius: 2,
                data: toChartJSdata(X3, Y3),
                label:"P1-P2"
            }
        ]
    }
    
    return (
        <Scatter options={options} data={cjsData} />
    )

}

export default function MohrsCircle(props) {
    const { s11, s22, s33, s12, s23, s13 } = props
    const {P1, P2, P3} = props

    const is2D = (s13 == 0 && s23 == 0 && s33 == 0)

    // set default font size and color
    ChartJS.defaults.font.size = 16
    const theme = useTheme();
    ChartJS.defaults.color = theme.palette.text.primary;    

    const Mohr = is2D ?
        <Mohr2D s11={s11} s22={s22} s12={s12} /> :
        <Mohr3D {...{P1, P2, P3}}/>
        
    return (
        <Paper elevation={3} sx={{ padding: "10px", textAlign: "center" }}>
            <Typography variant="overline">Mohr's Circle</Typography><br />
            {Mohr}
        </Paper>
    )
}