const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYXZhbnRpMjMiLCJhIjoiY2s1YjdmNzBlMG05dDNucnp1czl5OGplNCJ9.KPjUsXYfpXf9YVhjFpE3WA&limit=1'
    
    request({url, json:true}, (error, response, body) => {
       if(error){
            callback('Unable to connect location app')      
       }else if(body.features.length === 0){
            callback('Unable to find location. Try another search')  
       }else{
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name
            callback(undefined, {latitude, longitude, location})  
      }
     
 })   
} 

module.exports = geocode