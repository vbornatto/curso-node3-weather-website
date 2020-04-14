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
            callback(undefined,{temperatura: 'A temperatura atual é de '
                                +response.body.current.temperature+
                                ' graus C e a sensação termica é '+
                                response.body.current.feelslike + ' graus C.',
                                umidade: ' A umidade do ar está em '+
                                response.body.current.humidity+ '%',
                            descricao: 'O tempo está '+ response.body.current.weather_descriptions[0]+ '(  A api weatherstack free nao traduz. Vamos melhorar isso!)'  })
        }
               
    })   
}

module.exports = forecast