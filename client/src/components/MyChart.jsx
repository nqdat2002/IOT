import React from "react";
import { Line } from "react-chartjs-2";
import { rawDataSensor } from "../utils/constant";
import { lineChart_colors } from "../utils/constant";

const SlideTime = (data) => {
    return data.slice(10);
};

const ProcessRawData = (data, item, flag = true) => {
    let result = [];
    data.forEach(e => {
        if (e.hasOwnProperty(item) && flag){
            result.push(e[item]);
        }
        if (e.hasOwnProperty(item) && !flag){
            result.push(SlideTime(e[item]));
        }
    });
    return result;
};

class MyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: ProcessRawData(rawDataSensor, 'dateCreated', false),
                datasets: [
                    {
                        label: "Temperature",
                        data: ProcessRawData(rawDataSensor, 'temperature'),
                        borderColor: '#E15D1F',
                        lineTension: 0.5,
                        fill: true,
                        yAxisID: 'y',
                    },
                    {
                        label: "Humidity",
                        data: ProcessRawData(rawDataSensor, 'humidity'),
                        borderColor: '#1FC7E1',
                        lineTension: 0.5,
                        fill: true,
                        yAxisID: 'y',
                    },
                    {
                        label: "Luminosity",
                        data: ProcessRawData(rawDataSensor, 'luminosity'),
                        borderColor: '#ECEE4F',
                        lineTension: 0.5,
                        fill: true,
                        yAxisID: 'y1',
                    },
                ],
            }
        };
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            const newLabels = this.props.data.map((item) => {
                return SlideTime(item.dateCreated);
            });
            const newData = {
                temperature: this.props.data.map(item => item.temperature),
                humidity: this.props.data.map(item => item.humidity),
                luminosity: this.props.data.map(item => item.luminosity),
            };
            this.setState({
                data: {
                    labels: newLabels,
                    datasets: [
                        {
                            label: "Temperature",
                            data: newData.temperature,
                            borderColor: lineChart_colors.temperature,
                            lineTension: 0.5,
                            fill: true,
                            yAxisID: 'y',
                        },
                        {
                            label: "Humidity",
                            data: newData.humidity,
                            borderColor: lineChart_colors.humidity,
                            lineTension: 0.5,
                            fill: true,
                            yAxisID: 'y',
                        },
                        {
                            label: "Luminosity",
                            data: newData.luminosity,
                            borderColor: lineChart_colors.luminosity,
                            lineTension: 0.5,
                            fill: true,
                            yAxisID: 'y1',
                        },
                    ],
                }
            });
        }
    }
    render() {
        return (
            <Line
                data={this.state.data}
                options={{
                    maintainAspectRatio: false,
                    responsive: true, 
                    title: {
                        display: true,
                        text: "Smart Home",
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    },

                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Temperature (°C) & Humidity (%)',
                            },
                            grid: {
                                display: false,
                            },
                        },
                        y1: { 
                            position: 'right',
                            beginAtZero: true,
                            max: 4000,
                            title: {
                                display: true,
                                text: 'Luminosity (lux)',
                            },
                            grid: {
                                display: false,
                            },
                        },
                    },
                }}
            />
        );
    }
};

export default MyChart;