// NPM REQUEST MODULE
const request = require('request')

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?access_token=pk.eyJ1IjoiZGpha291IiwiYSI6ImNqc3hkOTlsaDByZWUzeXFqenV1bDczdDMifQ.kC9dRwni83pJFIBoyve4PQ&limit=1"
    
    request({ url, json: true}, (error, { body }) => {
        if (error)
            callback('Unable to connect to location services!', {undefined})
        else if (body.features.length === 0)
            callback('Unable to find place', {undefined})
        else {
            
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            const adress = body.features[0].place_name
            callback(undefined, {
                latitude,
                longitude,
                adress
            })
        }
    })
    }

module.exports = geocode


//
// CORE NODE HTTP/HTTPS MODULE
//
// const https = require('https')
// const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/paris.json?access_token=pk.eyJ1IjoiZGpha291IiwiYSI6ImNqc3hkOTlsaDByZWUzeXFqenV1bDczdDMifQ.kC9dRwni83pJFIBoyve4PQ"

// const request = https.request(url, response => {
//     let data = ''

//     response.on('data', chunk => {
//         data = data + chunk.toString()
//     })

//     response.on('end', () => {
//         const body = JSON.parse(data)
//         console.log(body)
//     })
// })

// request.on('error', error => {
//     console.log('An error', error)
// })
// request.end()