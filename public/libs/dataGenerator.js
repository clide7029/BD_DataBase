const axios = require('axios');

async function stockCandles(symbol, resolution, from, to) {
    try {
        const data = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`,{
            headers: {
            'X-Finnhub-Token' : 'c6im5hiad3i8jt9dugng'
        }
        })
        console.log(data.data)
        return data.data;
    } catch(err) {
        console.error(err);
    }
}
//var finnHubData = []
module.exports.generateChart =  async function(CurrentStock, chosenInterval='asdad') {
    //console.log("In Generate Chart")
    //tmp = await stockCandles('AAPL','M',1607241875,1638777875)
    var resolution = "M"
    var finnHubData = []  
    var currentTs = new Date();
    var currentTsSeconds = Math.floor(currentTs.valueOf()/ 1000)
    var pastTs = new Date(currentTs.getTime() - (31556926 * 1000))
    var pastTsSeconds = Math.floor(pastTs.valueOf()/1000)
    switch(chosenInterval) {
    case '1m' :
        resolution = "D"
        pastTs = new Date(currentTs.getTime() - (2629743 * 1000))
        pastTsSeconds = Math.floor(pastTs.valueOf()/1000)      
        break;
    case '3m' :
        resolution = "D"
        pastTs = new Date(currentTs.getTime() - (2629743 * 1000 * 3))
        pastTsSeconds = Math.floor(pastTs.valueOf()/1000)      
        break;
    case '6m' :
        resolution = "D"
        pastTs = new Date(currentTs.getTime() - (2629743 * 1000 * 6))
        pastTsSeconds = Math.floor(pastTs.valueOf()/1000)      
        break;
    case '1y' :
        resolution = "W"
        pastTs = new Date(currentTs.getTime() - (2629743 * 1000 * 12))
        pastTsSeconds = Math.floor(pastTs.valueOf()/1000)      
        break;
}


    //console.log("CurrentStock :" + CurrentStock + "past: " + pastTsSeconds + " current: " + currentTsSeconds);
    tmp = await stockCandles(CurrentStock,resolution,pastTsSeconds,currentTsSeconds);
    //tmp = JSON.parse(FinnHubStockPrices);
    //console.log(tmp)
    for (var i = 0; i < tmp.c.length; i++) {
            //console.log('loop')
            date = new Date(tmp.t[i] * 1000);
            year = date.getYear();
            month = date.getMonth();
            day = date.getDay();

            c = tmp.c[i];
            h = tmp.h[i];
            l = tmp.l[i];
            o = tmp.o[i];
            finnHubData = finnHubData + "{" + "\"x\": new Date(" + year + "," + month + "," + day + "),\"y\":[" + o + "," + h + "," + l + "," + c + "]},";
            //finnHubData = finnHubData + "{" + "\"x\":" + date + ",\"y\":[" + o + "," + h + "," + l + "," + c + "]},";
            //finnHubData[i] = {x:date, y:[o,h,l,c]};
            
            //console.log(finnHubData[i])
    }
    return finnHubData.slice(0,-1);
}  
/*
module.exports.makeChart = function(stockPrices) {
    var chart = new CanvasJS.Chart("chartContainer",
    {
        title:{
            text: "Basic Candle Stick Chart"
        },
        zoomEnabled: true,
        axisY: {    
            includeZero:false,
            title: "Prices",
            prefix: "$ "
        },
        axisX: {
            interval:2,
            intervalType: "month",
            valueFormatString: "MMM-YY",
            labelAngle: -45
        },
        data:
        {
            type: "candlestick",
            dataPoints: stockPrices 

        }
    });
    return chart;
}
*/