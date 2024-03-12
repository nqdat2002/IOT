import React from "react";
import { Line } from "react-chartjs-2";
import { getAllDataSensorHandler } from "../api";

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
    
    async componentDidMount() {
        await this.updateChartData(); // Initial API call
        this.interval = setInterval(this.updateChartData, 4000);
    }

    // updateChartData(responseData){
    //     this.setState(prevState => {
    //         let newLabels = prevState.data.labels;
    //         let newDatasets = prevState.data.datasets;
           

    //         let now = responseData.dateCreate;
    //         if (newLabels.length > 15) {
    //             newLabels.shift();
    //             newDatasets[0].data.shift();
    //             newDatasets[1].data.shift();
    //             newDatasets[2].data.shift();
    //         }
    //         newLabels.push(now);
    //         newDatasets[0].data.push(responseData.temperature);
    //         newDatasets[1].data.push(responseData.humidity);
    //         newDatasets[2].data.push(responseData.luminosity);

    //         console.log("ver 1", responseData.temperature, responseData.humidity, responseData.luminosity);

    //         return {
    //             data: {
    //                 ...prevState.data,
    //                 labels: newLabels,
    //                 datasets: newDatasets
    //             }
    //         };
    //     });
    // }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateChartData = async () => {
        try {
            const responseData = await getAllDataSensorHandler();
            this.setState((prevState) => {
                let newLabels = prevState.data.labels;
                let newDatasets = prevState.data.datasets;
                
                let len = responseData.length;
                let now = responseData[len - 15].dateCreated.split(" ")[1];
                if (newLabels.length > 15) {
                    newLabels.shift();
                    newDatasets[0].data.shift();
                    newDatasets[1].data.shift();
                    newDatasets[2].data.shift();
                }
                newLabels.push(now);
                newDatasets[0].data.push(responseData[len - 15].temperature);
                newDatasets[1].data.push(responseData[len - 15].humidity);
                newDatasets[2].data.push(responseData[len - 15].luminosity);
    
                console.log("ver 1", responseData[len - 15].temperature, responseData[len - 15].humidity, responseData[len - 15].luminosity);
    
                return {
                    data: {
                        ...prevState.data,
                        labels: newLabels,
                        datasets: newDatasets
                    }
                };
            });
        } catch (error) {
          console.error("Error updating chart data: ", error);
        }
    };
    
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