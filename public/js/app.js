
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent=  'Loading...'
    messageTwo.textContent= ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''

    const location = search.value
    fetch('/weather/?adress='+ location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                 
                return messageOne.textContent=data.error
            }
            
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.temperatura  
            messageFive.textContent = data.forecast.umidade
            messageSix.textContent = data.forecast.descricao

            messageFour.textContent = 'Latitude: '+ data.latitude 
            messageThree.textContent = 'Longitude: '+ data.longitude
            
        })
    })
})