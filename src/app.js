const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirParth = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirParth)) //From static index.html file

app.get('', (req, res) => { // From a dynamic index.hbs file
    res.render('index', {
        title: 'Weather App',
        name: 'Djakou'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Djakou'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Djakou',
        msg: 'follow this link to get help from a professional',
    })
})
/*
app.get('', (req, res) => {
    res.send('Hello express')
})
This is the same as above so it will never be displayed as the root '' is reconized as index.html


app.get('/help', (req, res) => {
    res.send({
        name: 'Djakou',
        age: 27
    })
})

app.get('/about', (req, res) => {
    res.send('About us!')
})
*/

app.get('/weather', (req, res) => {
    if(!req.query.adress)
        return res.send({error: 'You must provide an adress'})

    geocode(req.query.adress, (error, { latitude, longitude, adress } = {}) => {
        if(error)
            return res.send({ error })

        forecast(latitude, longitude, (error, forecast) => {
            if(error)
                return res.send({ error })

            res.send({
                forecast,
                adress, 
                location: req.query.adress,
        
            })
        })
    })
    
    
})

app.get('/products', (req, res) => {
    if(!req.query.search) 
        return res.send({error: 'You must provide a search term'})

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Djakou',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Djakou',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

