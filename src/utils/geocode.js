const request = require('postman-request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoic2FwbmExIiwiYSI6ImNrbXhib2xmeDBubWYycGxkanM2emd4ZzcifQ.dZ3aWcJnacNVOj1v7jnx9g'

    request({ url, json: true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect to loacation service!',undefined)
        } else if(body.features.length=== 0) {
            callback('Unable to find location . Try another search', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode