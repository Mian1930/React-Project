import React, { useEffect, useState } from 'react';
import getData from '../../Api/GetGraph';
import ApexChart from './ApexChart';
import StockTypes from '../Data/StockType';
import TestApexChart from './TestApexChart';

const Graph = (props) => {

    const initialstate = {
        FinalFirstData: [],
        FinalScndData: [],
        update: true,
        Series: []
    }
    const [FormData, setFormData] = useState(initialstate);
    const { FinalFirstData, FinalScndData, update, Series } = FormData;

    useEffect(async () => {
        // // debugger 
        let tempResult = []
        if (props.graphDate) {

            // series.length = 0;
            // myArray.splice(0, myArray.length);
            await props.graphDate.forEach((element, index) => {
                let Firstdata = []
                let ScndData = []

                // debugger
                let dataValues = Object.values(element)[0]
                let dataKey = Object.keys(element)[0]

                if (dataKey == "kibor") {
                    console.log('Kibor')
                    // const date = new Date()
                    Firstdata.push(
                        dataValues.date
                    )
                    ScndData.push(parseFloat(dataValues.bid))
                }
                else {
                    dataValues.map((item, index) => {
                        if (props.type == "mutualFunds") {
                            // const date = new Date(item.date)
                            Firstdata.push(
                                item.date
                            )
                            ScndData.push(parseFloat(item.nav))
                        }
                        else if (props.type == "stocks") {
                            // const date = new Date(item.date)

                            Firstdata.push(
                                item.time
                            )
                            ScndData.push(parseFloat(item.close))
                        }


                        if (index == dataValues.length - 1) {
                            setFormData({
                                ...FormData,
                                FinalFirstData: Firstdata,
                                FinalScndData: ScndData,
                                update: true
                            })
                        }

                    })
                }

                let ritem = StockTypes[props.type].find(o => o.abbr == dataKey)

                let result = {
                    firstData: Firstdata,
                    secondData: ScndData,
                    name: dataKey,
                    title: ritem ? ritem.title : dataKey
                }


                // temp.push(result)
                tempResult.push(result)
                if (index == props.graphDate.length - 1) {
                    setFormData({
                        ...FormData,
                        Series: tempResult
                    })
                }
                // series.push(result);
            });
        }

        // // eslint-disable-next-line
    }, [props.graphDate, props.subType, props.subTypeName, props.type]);

    return (
        <>
            {update ?
                <>
                    <ApexChart
                        Firstdata={FinalFirstData}
                        ScndData={FinalScndData}
                        subType={props.subType}
                        seriesResult={Series} />

{/* <TestApexChart /> */}

                    {/* <p className="text-center TextLabel textComp bulletText"></p> */}
                </>
                : <p>Loading...</p>}
        </>
    );
}

export default Graph;