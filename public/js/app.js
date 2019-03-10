console.log('Yeah')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msg1.textContent= 'Loading...'
    msg2.textContent= ''

    fetch('/weather?adress=' + location).then((response) => { // without adding http://localhost:3000 before /weather so it will fetch either locally or on server
    response.json().then((data) => {
        if(data.error)
            msg1.textContent = data.error

        else {
            msg1.textContent = data.adress
            msg2.textContent = data.forecast
        }
    })
})
})