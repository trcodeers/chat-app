var socket  = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormbutton = $messageForm.querySelector('button')
const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML


socket.on('message',(message) =>{
  console.log(message)
  const html = Mustache.render(messageTemplate,{
    message : message.text,
    createdAt : moment(message.createdAt).format('h:m a') 

  })
  $messages.insertAdjacentHTML('beforeend',html)  
})



document.querySelector('#message-form').addEventListener('submit',function(e){
  e.preventDefault()
  $messageFormbutton.setAttribute('disabled','disabled')
  var inputmessage = document.querySelector('#msg').value

  socket.emit('sendmessage',inputmessage,(error,result) =>{
      if(error) {
        return console.log(error)
      }
      console.log('Message delivered!')
  
  })

    document.querySelector('#msg').value = ''
    $messageFormInput.focus()
    $messageFormbutton.removeAttribute('disabled')

})
