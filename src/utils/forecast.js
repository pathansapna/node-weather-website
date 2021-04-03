const request = require('postman-request')
forecast = (latitude, longitude, callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=314ac3ccc1c67b528c70c51da85a23e1&query='+ latitude +',' + longitude + '&unit=f'
    request({url, json: true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect to weather service!',undefined)

        }else if(body.error){
            callback('Unable to find location . Try another search', undefined)

        }else{

            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees out. It feels like ' +body.current.feelslike  + ' degrees out. There humidity is ' +body.current.humidity+ ' and the local time is ' +body.location.localtime+ '.');

        }
    })

}
module.exports = forecast