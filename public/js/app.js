
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent=  'Loading...'
    messageTwo.textContent= ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    const location = search.value
    fetch('/weather/?adress='+ location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                 
                return messageOne.textContent=data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            messageFour.textContent = 'Latitude: '+ data.latitude 
            messageThree.textContent = 'Longitude: '+ data.longitude
            
        })
    })
})