const request = require('request')

forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ade1d1855e2b57738eb69f5898d9a8ab&query='+ latitude+','+longitude
    request({url: url, json:true}, (error, response) =>{
        
        if (error){            
            callback('Unable to connect to weather service!',undefined)            
        }
        else if (response.body.error){            
            callback('Unable to find location!',undefined)
        } else {
            callback(undefined,'A temperatura atual é de '
                                +response.body.current.temperature+
                                ' Graus C e a sensação termica é '+
                                response.body.current.feelslike + ' Graus C')
        }
               
    })   
}

module.exports = forecast