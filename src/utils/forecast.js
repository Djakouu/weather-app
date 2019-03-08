const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/052901523d3a7b174c7b5ba334666afb/" + latitude + "," + longitude + "?lang=en&units=si"
    
    request({ url, json: true }, (error, { body }) => {
        //json: true == const data = JSON.parse(response.body)
        if (error)
            callback('Unable to connect to weather service!', {undefined})
        else if (body.error)
            callback('Unable to find area', {undefined})
        else
            callback(undefined, body.daily.data[0].summary)
    
    })
    }

module.exports = forecast