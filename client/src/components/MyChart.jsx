import React from "react";
import { Line } from "react-chartjs-2";

class MyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: Array.from({ length: 15 }, (_, index) => index),
                datasets: [
                    {
                        label: "Temperature",
                        data: Array(15).fill(0),
                        borderColor: '#E15D1F',
                        lineTension: 0.5,
                        fill: true,
                        yAxisID: 'y',
                    },
                    {
                        label: "Humidity",
                        data: Array(15).fill(0),
                        borderColor: '#1FC7E1',
                        lineTension: 0.5,
                        fill: true,
                        yAxisID: 'y',
                    },
                    {
                        label: "Luminosity",
                        data: Array(15).fill(0),
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
            const newLabels = this.props.data.map(item => item.dateCreated);
            const newData = {
                temperature: this.props.data.map(item => item.temperature),
                humidity: this.props.data.map(item => item.humidity),
                luminosity: this.props.data.map(item => item.luminosity)
            };
            this.setState({
                data: {
                    labels: newLabels,
                    datasets: [
                        {
                            label: "Temperature",
                            data: newData.temperature,
                            borderColor: '#E15D1F',
                            lineTension: 0.5,
                            fill: true,
                            yAxisID: 'y',
                        },
                        {
                            label: "Humidity",
                            data: newData.humidity,
                            borderColor: '#1FC7E1',
                            lineTension: 0.5,
                            fill: true,
                            yAxisID: 'y',
                        },
                        {
                            label: "Luminosity",
                            data: newData.luminosity,
                            borderColor: '#ECEE4F',
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