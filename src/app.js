
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Avanti Deshmukh'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Avanti Deshmukh'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        helpText: ' We can help you here',
        name: 'Avanti Deshmukh'
      })
})

app.get('/weather',(req, res) =>{

  if(!req.query.address)  {
      return res.send({
          error: 'You must provide an address'
      })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={})=>{
        if(error){
            res.send({
                error: error
            })
        }else{
            
           forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    res.send({
                        error: error
                    })
                }else{

                    res.send({
                        address: req.query.address, 
                        forecast: forecastData,
                        location: location
                      })
                 
                }
           })
        }
   })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Help article not found',
        name: 'Avanti Deshmukh'
    })
})
app.get('*',(req, res) =>{
    res.render('404',{
        title: 'Error 404',
        errorMessage: 'Page not found',
        name: 'Avanti Deshmukh'
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running')
})