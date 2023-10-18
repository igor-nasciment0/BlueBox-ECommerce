import { Bar } from "react-chartjs-2"
import React from "react"
import {Chart as ChartJS} from 'chart.js/auto'


export default function Grafico({chartData}){
    return <Bar data={chartData} />
}