const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/970b46ac94dc08d324f7de1177f1cb0f/' + latitude +','+ longitude +'?units=si'

    request({url, json:true}, (error, response, body) =>{
    
        if(error){
           callback(error)    
        }else if(body.error){
            callback(error)   
        }
        else{
           const data = `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain. Maximum Temperature is ${body.daily.data[0].temperatureHigh} degrees and Minimum Temperature is ${body.daily.data[0].temperatureLow} degrees.`
           callback(undefined, data)
        }
    })
}

module.exports = forecast