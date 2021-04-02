const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlbars engine and viewa location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Sapna Pathan'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Sapna Pathan'
    })
})
app.get('/about', (req,res) =>{
 res.render('about', {
     title: 'About us',
     name: 'Sapna Pathan'
 })
})
app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error,forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is sunny',
    //     location: 'Maharashtra',
    //     address: req.query.address
    // })
})
app.get('/products', (req,res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
  })

app.get('*', (req, res)=>{
res.render('404', {
    title: '404',
    name: 'Sapna Pathan',
    errorMessage: 'Page not found'
})
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Sapna Pathan',
        errorMessage: 'Help article  not found'
    })
})
app.get('', (req, res) =>{
    res.send('Hello Express!!')
})
// app.get('/help', (req, res) =>{
//     res.send('Help page')
// })

// app.get('/about', (req, res) =>{
//     res.send('<h1>About this page</h1>')

// })



app.listen(3000, () => {
console.log('Server is up on port 3000 .')

})