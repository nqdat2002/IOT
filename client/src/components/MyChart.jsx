import React from "react";
import { Line } from "react-chartjs-2";

class MyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: [0],
                datasets: [
                    {
                        label: "Temperature",
                        data: [0],
                        borderColor: '#E15D1F',
                        lineTension: 0.5,
                        fill: true,
                        yAxisID: 'y',
                    },
                    {
                        label: "Humidity",
                        data: [0],
                        borderColor: '#1FC7E1',
                        lineTension: 0.5,
                        fill: true,
                        yAxisID: 'y',
                    },
                    {
                        label: "Luminosity",
                        data: [0],
                        borderColor: '#ECEE4F',
                        lineTension: 0.5,
                        fill: true,
                        yAxisID: 'y1',
                    },
                ],
            }
        };
        // this.temperature_value = props.temperature_value;
        // this.humidity_value = props.humidity_value;
        // this.luminosity_value = props.luminosity_value;
    }
    
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prevState => {
                // let newLabels = [...prevState.data.labels];
                // let newDatasets = prevState.data.datasets.map(dataset => ({
                //     ...dataset,
                //     data: [...dataset.data, Math.floor(Math.random() * 100)]
                // }));
                let newLabels = prevState.data.labels;
                let newDatasets = prevState.data.datasets;
               

                let now = new Date();
                now = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" +  ("0" + now.getSeconds()).slice(-2);
                if (newLabels.length > 15) {
                    newLabels.shift();
                    newDatasets[0].data.shift();
                    newDatasets[1].data.shift();
                    newDatasets[2].data.shift();
                }
                newLabels.push(now);
                newDatasets[0].data.push(this.props.temperature_value);
                newDatasets[1].data.push(this.props.humidity_value);
                newDatasets[2].data.push(this.props.luminosity_value);

                console.log("ver 1", this.props.temperature_value, this.props.humidity_value, this.props.luminosity_value);

                return {
                    data: {
                        ...prevState.data,
                        labels: newLabels,
                        datasets: newDatasets
                    }
                };
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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