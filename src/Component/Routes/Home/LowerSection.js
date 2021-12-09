import React from 'react';
import Slider from '@mui/material/Slider';
import $ from "jquery";
import systems from '../../../Images/sys.png'
import Markets from "../Data/Markets"
import timeLap from "../Data/timeLap"
import InvestmentRange from "../Data/InvestmentRange"
import Graph from './Graph';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import StockTypes from '../Data/StockType';
import getData from '../../Api/GetGraph';
import LinearProgress from '@mui/material/LinearProgress';

class LowerSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'mutualFunds',
            typeCode: 'mutualFunds',
            subType: ['F042'],
            typeName: ['ABL Stock Fund'],
            subTypeCode: ['F042'],
            time: 4,
            amount: 2,
            dataSet: Markets,
            timeMarks: timeLap,
            amountMarks: InvestmentRange,
            subStockTypes: StockTypes,
            obtPerct: 0,
            AmountBecomed: 0,
            count: 0,
            price: 25000,
            graphDate: [],
            graphValueName: ['ABL Stock Fund'],
            loading: true
        }
    }

    addActiveMarket = (e) => {
        let subStateAbbr = this.state.subStockTypes[e.target.value].length > 0 ? [this.state.subStockTypes[e.target.value][0].abbr] : ''
        this.setState({
            subType: subStateAbbr,
            typeName: this.state.subStockTypes[e.target.value].length > 0 ? this.state.subStockTypes[e.target.value][0].title : '',
        });
        // console.log('6th call')
        this.generateChart(e.target.value, subStateAbbr)
        $(".stock-company > div").removeClass('Active')
        let temp = $(".stock-company > div:nth-child(1)")
        if (temp) temp.addClass('Active')

    }

    addActiveComp = (e) => {
        // debugger
        if (!this.state.subType.includes(e.target.parentNode.dataset.val)) {
            let tempType = []
            let tName = []
            // If markets select greater than 2
            if (this.state.subType.length == 2) {
                tempType = []
                tName = []
                tempType.push(e.target.parentNode.dataset.val)
                tName.push(e.target.parentNode.dataset.className)
                $(".stock-company > div").removeClass('Active')
                $(e.target.parentNode).addClass('Active')
            } else {
                // If markets select less than 2
                $(e.target.parentNode).addClass('Active')

                tempType = this.state.subType;
                tName = this.state.typeName

                tempType.push(e.target.parentNode.dataset.val)
                tName.push(e.target.parentNode.dataset.name)
            }
            this.setState({
                typeName: tName,
                subType: tempType
            })

            this.generateChart(this.state.type, tempType)
        } else {
            if (this.state.subType.length > 1) {
                let item = this.state.subType;
                const index = item.indexOf(e.target.parentNode.dataset.val);
                let itemType = this.state.typeName;
                const indexType = itemType.indexOf(e.target.parentNode.dataset.name);

                if (index > -1) {
                    item.splice(index, 1);
                }
                if (indexType > -1) {
                    itemType.splice(indexType, 1);
                }
                this.setState({
                    typeName: itemType,
                    subType: item
                })
                // If markets select greater than 2
                $(e.target.parentNode).toggleClass('Active')

                this.generateChart(this.state.type, item)
            }
        }
    }

    updatGraphSTates() {
        // this.setState({
        //     AmountBecomed : +amountBecomed,
        //     obtPerct : +percentage,
        //     graphDate : graphDate,
        //     loading : false,
        //     subTypeCode : this.state.subType,
        //     graphValueName : this.state.typeName,
        //     type : type
        // })
    }

    generateChart = async (type, subtype) => {
        this.setState({
            loading: true
        })
        let investedAmount = this.state.amountMarks[this.state.amount].scaledValue;
        let timePeriod = this.state.timeMarks[this.state.time].label
        let amountBecomed = 0
        let payLoad = {}
        let percentage = 0;
        let response;
        let graphDate = [];

        if (type == 'kibor') {
            await getData.getKibor(21).then(res => {
                let obj = {}
                response = res.data.data;
                if (response.length > 0) {
                    let resultObj = response.find(o => o.tenor.toUpperCase() === timePeriod);
                    let bidAmount = 0;
                    if (resultObj) {
                        bidAmount = +resultObj.bid
                    } else {
                        // In case when value against year not avaiable
                        resultObj = response[response.length - 1];
                        // Multiple year value with last bid amount
                        bidAmount = +resultObj.bid * (this.state.timeMarks[this.state.time].scaledValue)
                    }
                    console.log('bidAmount', bidAmount)
                    amountBecomed += (investedAmount * (bidAmount + 1))
                    // Present Vlaue = invedted amount * (bidAmount + 1)
                    percentage += (bidAmount * 100)

                    obj['kibor'] = resultObj
                    graphDate.push(obj)
                    this.setState({
                        AmountBecomed: amountBecomed,
                        obtPerct: percentage,
                        graphDate: graphDate,
                        loading: false,
                        subTypeCode: this.state.subType,
                        graphValueName: this.state.typeName,
                        type: type
                    })

                }
            }, err => {
                console.log(err)
            })
        }
        if (subtype) {
            subtype.forEach(async (subTypeId, index) => {
                let obj = {}
                if (type == 'mutualFunds') {
                    payLoad.fund_id = subTypeId
                    // 
                    await getData.getFunds(payLoad, this.state.timeMarks[this.state.time].label).then(res => {
                        response = res.data.data
                        if (response.length > 0) {
                            let currentPrice = res.data.data[0].nav
                            let lastPrice = res.data.data[res.data.data.length - 1].nav
                            amountBecomed += investedAmount * currentPrice / lastPrice
                            // percent = present value-investedamount * 100 / invested amount
                            percentage = (amountBecomed - investedAmount) * 100 / investedAmount
                            // amountBecomed = amountBecomed.toFixed(2)
                            // percentage = percentage.toFixed(2)
                            // graphDate = response
                            obj[subTypeId] = response
                            graphDate.push(obj)
                        }
                    }, err => {
                        console.log(err)
                    })
                }
                else if (type == 'stocks') {
                    await this.getStocksdata(subTypeId).then((res) => {
                        response = res.data.data;
                        if (response.length > 0) {
                            res = response
                            let currentPrice = res[0].close
                            let lastPrice = res[res.length - 1].close
                            amountBecomed += investedAmount * currentPrice / lastPrice
                            // percent = present value-investedamount * 100 / invested amount
                            percentage = (amountBecomed - investedAmount) * 100 / investedAmount
                            // amountBecomed+= amountBecomed.toFixed(2)
                            // percentage += percentage.toFixed(2)
                            // graphDate.push({subTypeId : response}) 
                            obj[subTypeId] = response
                            graphDate.push(obj)
                        }
                    });
                }
                if (index + 1 == subtype.length) {
                    this.setState({
                        AmountBecomed: +amountBecomed,
                        obtPerct: +percentage,
                        graphDate: graphDate,
                        loading: false,
                        subTypeCode: this.state.subType,
                        graphValueName: this.state.typeName,
                        type: type
                    })
                }
            });
        }

    }

    leftPad(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }


    getStocksdata(subtype) {

        let DayMinus = 0
        if (this.state.time == 0) {
            DayMinus = 93
        }
        else if (this.state.time == 1) {
            DayMinus = 186
        }
        else if (this.state.time == 2) {
            DayMinus = 279
        }
        else if (this.state.time == 3) {
            DayMinus = 365
        }
        else if (this.state.time == 4) {
            DayMinus = 1095
        }
        else if (this.state.time == 5) {
            DayMinus = 1460
        }

        var myCurrentDate = new Date();
        var myPastDate = new Date(myCurrentDate);
        myPastDate.setDate(myPastDate.getDate() - DayMinus);

        let currentDate = `${myCurrentDate.getFullYear()}-${this.leftPad((myCurrentDate.getMonth() + 1), 2)}-${this.leftPad(myCurrentDate.getDate(), 2)}`
        let pastDate = `${myPastDate.getFullYear()}-${this.leftPad((myPastDate.getMonth() + 1), 2)}-${this.leftPad(myPastDate.getDate(), 2)}`

        const res = getData.getGraphData(pastDate, currentDate, subtype)
        return res
    }

    numFormatter(num) {
        // alert(num)
        // return this.state.amountMarks[num].label
    }

    timeFormatter(num) {
        // return this.state.timeMarks[num].label
    }

    valuetext(value) {
        return `${value}RS`;
    }


    handleAmountChange = (event, newValue) => {
        // Investment Change
        this.setState({
            amount: newValue
        })
        this.generateChart(this.state.type, this.state.subTypeCode)
    };


    handleTimeChange = async (event, newValue) => {
        // Time change
        // console.log(this.state.timeMarks)
        this.setState({
            time: newValue
        })
        // console.log('2nd call')

        this.generateChart(this.state.type, this.state.subTypeCode)
    };

    componentDidMount() {
        $(".stock-company > div:nth-child(1)").addClass('Active')
        // console.log('3st call')

        this.generateChart(this.state.type, this.state.subTypeCode)
    }




    render() {
        return (
            <>
                <div className="container py-5">
                    <div className="row stock-amount my-md-5 py-md-5">
                        <div className="col-lg-5">
                            <div className="stock-amount-main">
                                <p className="text-left font-14 font-light"><strong>MARKET CALULATOR</strong></p>
                                <div className="d-flex align-items-center">
                                    <h2 className="font-bold font-40 stock-amount-main-text"><strong>What if you invested in</strong>
                                        <Select
                                            value={this.state.type}
                                            onChange={this.addActiveMarket}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            id="market_select"
                                            className="font-bold font-40"
                                            disabled={this.state.loading}
                                        >
                                            <MenuItem value={'mutualFunds'}>Mutual Funds</MenuItem>
                                            <MenuItem value={'stocks'}>Stocks</MenuItem>
                                            <MenuItem value={'forex'}>Forex</MenuItem>
                                            <MenuItem value={'kibor'}>Term Deposit</MenuItem>
                                            <MenuItem value={'nationalSavings'}>National Saving</MenuItem>
                                        </Select></h2>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-12 col-sm-8">
                                    <p className="text-grey mb-0 font-medium font-14">Investment Amount</p>
                                    <div className="d-flex align-items-baseline"><h3 className="font-32 font-bold">{(this.state.amountMarks[this.state.amount].scaledValue).toLocaleString()}</h3><p className="font-16 font-bold pl-1"><strong>PKR</strong></p></div>
                                    <div className="stock-amount-slider">
                                        <Slider
                                            aria-label="Always visible"
                                            defaultValue={2}
                                            getAriaValueText={this.valuetext}
                                            step={null}
                                            scale={this.state.amountMarks.scaledValue}
                                            marks={this.state.amountMarks}
                                            valueLabelFormat={this.numFormatter}
                                            max={this.state.amountMarks.length - 1}
                                            min={0}
                                            valueLabelDisplay="auto"
                                            onChangeCommitted={(event, newValue) => this.handleAmountChange(event, newValue)}
                                            disabled={this.state.loading}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12 col-sm-8">
                                    <p className="text-grey font-medium font-14 mb-0">Term</p>
                                    <div className="d-flex align-items-baseline"><h3 className="font-32 font-bold">{this.state.timeMarks[this.state.time].scaledValue}</h3><p className="font-16 font-bold  pl-1"><strong>{this.state.timeMarks[this.state.time].span}</strong></p></div>

                                    {/* <h3 className="font-32 font-bold" >{this.state.timeMarks[this.state.time].name}</h3> */}
                                    <div className="stock-amount-slider mb-5">
                                        <Slider
                                            aria-label="Always visible"
                                            defaultValue={4}
                                            getAriaValueText={this.valuetext}
                                            step={null}
                                            marks={this.state.timeMarks}
                                            scale={this.state.timeMarks.scaledValue}
                                            valueLabelFormat={this.timeFormatter}
                                            max={this.state.timeMarks.length - 1}
                                            min={0}
                                            valueLabelDisplay="auto"
                                            onChangeCommitted={(event, newValue) => this.handleTimeChange(event, newValue)}
                                            disabled={this.state.loading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-lg-6 mb-p-0">
                            <div class="graph-loader">
                                {this.state.loading == true &&
                                    <LinearProgress />
                                }
                            </div>
                            <div className="chart-area">
                                <div className="d-flex justify-content-between chart-area-numbers">
                                    <div className="text-center w-50">
                                        <span className="text-grey font-medium font-14">Expected Change</span>
                                        <h3 className="graphPer font-bold font-32">{(this.state.obtPerct).toFixed(2)} %</h3>
                                    </div>
                                    <div className="text-center w-50">
                                        <span className="text-grey font-medium font-14">Expected Revenue</span>
                                        <div className="d-flex align-items-baseline justify-content-center"><h3 className="font-32 font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format((this.state.AmountBecomed).toFixed(0).toLocaleString())}</h3></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex stock-company sliding">
                                        {this.state.subStockTypes[this.state.type].map((value, index) => {
                                            return <div key={index} data-val={value.abbr} className={index == 0 ? 'Active' : ''} data-name={value.title}><img src={value.imgUrl ? value.imgUrl : systems} alt="" onClick={this.addActiveComp} /></div>
                                        })}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <Graph
                                        graphDate={this.state.graphDate}
                                        subType={this.state.subTypeCode}
                                        subTypeName={this.state.graphValueName}
                                        type={this.state.type}
                                    />
                                </div>
                                <a href="#" className="btn_secondary">Open Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


// Update these stocks on APC:
// 1- Systems Limited (SYS)
// 2- Engro Polymer (EPCL)
// 3- Meezan Bank (MEBL)
// 4- TPL Properties (TPLP)
// 5- Avenceon (AVN)
// 6- TRG (TRG)

// For Funds:

// 1- ABL Stock Fund (F042)
// 2- UBL Stock Advantage Fund (F096)
// 3- Meezan Mutual Fund (F123)
// 4- ABL Islamic Cash Fund (217D)

export default LowerSection;