const request = require("request")

const weather = (address,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=e3632daa7bba6a1833231f5a33cd8816&query='+ encodeURIComponent(address) +'&units=m'
    console.log(url)

    request({ url ,json : true}, (error,{ body })=>{
        console.log(body)
        if(error){
            callback("connection lost!.please check your internet connection...",undefined)
        }else if(body.error){
            callback("location not given",undefined)
        }else{
            callback(undefined ,{
                location : body.location.name+" , " + body.location.region +" , " +body.location.country,
                description : body.current.weather_descriptions[0],
                temperature : body.current.temperature +" degree",
                humidity : body.current.humidity
            })
        }
    })
}

module.exports={
    weather : weather
}