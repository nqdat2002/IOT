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
                    },
                    {
                        label: "Humidity",
                        data: [0],
                        borderColor: '#1FC7E1',
                        lineTension: 0.5,
                    },
                    {
                        label: "Luminosity",
                        data: [0],
                        borderColor: '#ECEE4F',
                        lineTension: 0.5,
                    },
                ],
            }
        };
    }


    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(prevState => {
                let newLabels = [...prevState.data.labels, prevState.data.labels.length];
                let newDatasets = prevState.data.datasets.map(dataset => ({
                    ...dataset,
                    data: [...dataset.data, Math.floor(Math.random() * 100)]
                }));
    
                if (newLabels.length > 15) {
                    newLabels.shift();
                    newDatasets = newDatasets.map(dataset => ({
                        ...dataset,
                        data: dataset.data.slice(1)
                    }));
                }
    
                return {
                    data: {
                        ...prevState.data,
                        labels: newLabels,
                        datasets: newDatasets
                    }
                };
            });
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        return (
            <Line
                data={this.state.data}
                options={{
                    title: {
                        display: true,
                        text: "World population per region (in millions)"
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    }
                }}
            />
        );
    }
};

export default MyChart;