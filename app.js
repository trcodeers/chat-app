const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const http = require('http');
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)
const Filter = require('bad-words')
const {generatemessage} = require('./message')

const publicDirectory = path.join('__dirname','../public')
const viewsPath = path.join('__dirname','../views')
const partialspath = path.join('__join','../views/partials')


app.use(express.static(publicDirectory))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialspath)





io.on('connection', (socket) =>{  


  console.log('New web socket connection')

  // io.emit('message',{
  // 	text:'welcome',
  // 	createdAt: new Date().getTime()
  // })
  io.emit('message',generatemessage('welcome'))


  socket.on('sendmessage',(m,callback) => {
      	
		filter = new Filter()

		if (filter.isProfane(m)) {
			 console.log(filter.clean(m))
			callback('Message can not be delivered as some profane words are present!',undefined)
		}

		console.log(m)
		  io.emit('message',generatemessage(filter.clean(m)))

		callback(undefined,'Message delivered')
  })
})




const port = process.env.PORT || 3000

server.listen(port,()  =>{
  console.log("App is listening on port "+ port)
})
