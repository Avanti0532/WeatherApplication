
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#error')
const messageTwo = document.querySelector('#message')

weatherForm.addEventListener('submit',function(e){
    e.preventDefault();
    const location = e.target.elements.search.value
    fetch('/weather?address='+ location).then((response) =>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})