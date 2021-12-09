import React from 'react';
import ReactApexChart from 'react-apexcharts'
import $ from "jquery";


class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41]
            }],
            // options: {
            //     chart: {
            //         type: 'area',
            //         zoom: {
            //             enabled: false
            //         },
            //         sparkline: {
            //             enabled: true
            //         },
            //         animations: {
            //             enabled: false,
            //         },
            //     },
            //     dataLabels: {
            //         enabled: false
            //     },
            //     stroke: {
            //         curve: 'smooth',
            //         width: [3, 3],
            //     },
            //     labels: ['ABL Stock Fund'],
            //     xaxis: {
            //         type: 'datetime',
            //     },
            //     yaxis: {
            //         opposite: false,
            //     },
            //     colors: ["#FF1654", "#247BA0"],
            //     legend: {
            //         horizontalAlign: 'left'
            //     },
            //     fill: false,
            //     grid: {
            //         show: true,
            //     },
            // },

            options: {
                chart: {
                    height: 350,
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                },
                colors: ["#FF1654", "#247BA0"],
            },
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.seriesResult != nextProps.seriesResult) {
            let seriesData = []
            let seriesLabels = []
            let categories = nextProps.seriesResult[0].firstData
            nextProps.seriesResult.forEach((element, index) => {
                let temp = {
                    data: element.secondData,
                    name: element.title
                }
                // console.log(categories.length)
                // console.log(element.firstData.length)
                if (categories.length < element.firstData.length) {
                    // alert(1)
                    categories = element.firstData
                }


                // debugger
                seriesData.push(temp)
                seriesLabels.push(element.title)
                if (index == nextProps.seriesResult.length - 1) {
                    console.log('seriesData', nextProps)


                        var b = {
                            ...this.state.options,
                            xaxis: {
                                ...this.state.options.xaxis,
                                categories: categories
                            }
                        }
                    this.setState({
                        series: seriesData,
                        options: b
                    })
                }

            });


            // this.setState({  })
            // console.log(nextProps)
            // this.setState({
            //     sD: nextProps.ScndData
            // });
        }
    }

    componentDidMount() {
    }

    // getWidth(){
    //     let width = document.getElementById('chart').offsetWidth;
    //     this.setState({
    //         width : `${width}px`
    //     })
    // }



    render() {
        return (
            <div id="chart" >
                {console.log('orignal', this.state)}
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350}
                />
            </div>


        );
    }
}


export default ApexChart;