const weatherForm = document.querySelector('#searchForm')
const nameform = document.querySelector('#nameForm')


const searchplace = document.querySelector('#place')
const loc = document.querySelector('#location')
const description = document.querySelector('#description')
const temperature = document.querySelector('#temperature')
const humidity = document.querySelector('#humidity')
const error = document.querySelector('#error')

const inputname = document.querySelector('#enter')
const name1 = document.querySelector('#name')
const welcome = document.querySelector('#welcome')

nameform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const userName = inputname.value

    name1.textContent = 'Hello , ' + userName
    welcome.textContent = "Welcome Here"
})

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    const address = searchplace.value

    loc.textContent = 'loading...'

    fetch('http://localhost:3000/weather?address='+encodeURIComponent(address)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                error.textContent = "error : location not found"
                loc.textContent = ''
                description.textContent = ''
                temperature.textContent = ''
                humidity.textContent = ''
            }
            else{
                loc.textContent = 'Location : ' + data.location
                description.textContent = 'weather nature : '+ data.description
                temperature.textContent = 'temperature : '+data.temperature
                humidity.textContent = 'humidity : ' + data.humidity
                error.textContent = ""
            }
        })
    })

})
