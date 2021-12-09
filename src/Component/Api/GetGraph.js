import axios from 'axios'

class getData {
    constructor() {
        this.result = [];
        this.state = {
           url : `https://api.capitalstake.com/2.0/`,
           url2 : `http://3.0.95.68:8000/`,
           url3 : 'http://52.76.9.188:8000/2.0/'
        }
    }

    getGraphData = (PastDate, CurrentDate, subType) => {
        const res = async () => {
            const resp = await axios.post('http://52.76.9.188:8000/historicalvalues', {
                symbol:subType,
                from:PastDate,
                to:CurrentDate
            })
            .catch(function (error) {
                console.log(error);
            });
            return resp;

        }
        return res();
    }

    getFunds = (payload, timeSpan) => {
        const res = async () => {
            const resp = await axios.post(`${this.state.url2}funds/${timeSpan}`, payload)
            .catch(function (error) {
                console.log(error);
            });
            return resp;

        }
        return res();
    }

    getKibor = (value) => {
        const res = async () => {
            const resp = await axios.get(`${this.state.url2}kibor/${value}`)
            .catch(function (error) {
                console.log(error);
            });
            return resp;

        }
        return res();
    }

    getStocks(){

    }

}
export default new getData();