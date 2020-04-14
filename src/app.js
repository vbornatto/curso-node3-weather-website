const path = require('path')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config     
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialPath)

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
 
// setup satatic directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('', (req, res) =>{
//     res.render('index', {
//         title: 'Weather',
//         name:'Valdecir Bornatto'
//     })
// })
app.get('',(req, res) =>{

    if(!req.query.adress){
        return res.render('index',{ title: 'Weather', name:"Valdecir Bornatto",
                location:"You must provide some search term", forecast:""} )
    }
    geocode(req.query.adress, (error, data) => {
        if (error){
            return res.send(error)
        }

        forecast(data.longitude,data.latitude,(error, dataForecast)=>{
               if (error){
                   return res.send(error)
               } 
               res.render('index',{
                   title: "Weather",
                   name:"Valdecir Bornatto",
                   location:data.location,
                   forecast: dataForecast
               }) 
               
        //        res.send('<h1>'+ data.location +'</h1><br><h1>'+dataForecast+'</h1>')
         })
    })
})


app.get('/about',(req, res)=>{
   res.render('about',{
       title: 'About',
       name: 'Valdecir Bornatto'
   })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        title: 'Help',
        message: 'To be safe during this particular period just stay home',
        name: 'Valdecir Bornatto'

    })
})

app.get('/weather',(req, res)=>{
    if (!req.query.adress){
        return res.send({
            error: 'You must provide an adress'
        })
    }
    geocode(req.query.adress, (error,data) =>{
        if(error){
            return res.send({error: error})
        }
        forecast(data.longitude,data.latitude,(error,forecastData)=>{
            if(error){
                return res.send({error:error})            
            }
            res.send({
                forecast:forecastData,
                location: data.location,
                adress: req.query.adress,
                longitude: data.longitude,
                latitude: data.latitude   
            })
        })    
    })
})


app.get('/help/*', (req, res)=>{
    res.render('404',{title: 404,
                      name: 'Valdecir Bornatto',
                    errorMessage: 'Help article not found!'  })
})

app.get('*',(req,res)=>{
    res.render('404',{title: '404',
                       name: 'Valdecir Bornatto',
                    errorMessage: 'Page not found!'})
})

app.listen(port,() =>{
    console.log('Server is up on port'+ port)
})