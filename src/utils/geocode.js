const request = require('request')

const geocode = (address,callback)=>{
    const geoCodingUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYW5pcmJhbi1uYXllayIsImEiOiJja2pvcDRyOXQwZm0xMnNsMXBvN3kwMm92In0.PGZciNNh2W7xIjtBiKXmJw&limit=1"

    request({url : geoCodingUrl , json : true},(error,{ body })=>{
        if(error){
            callback("connection lost!.please check your internet connection...",undefined)
        }else if(body.message){
            callback("place name not entered",undefined)
        }else if(body.features.length===0){
            callback("place not found. please enter correct place name..",undefined)
        }else{
                callback(undefined,
                {
                    latitute : body.features[0].center[1],
                    longitude : body.features[0].center[0],
                    location : body.features[0].place_name
                }
            )
        }
    })
}

module.exports = {
    geocode : geocode
}