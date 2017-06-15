const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

users = []
connection = []

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

server.listen(8080)
console.log('listening on port 8080....')

// app.listen(8080, function () {
//   console.log('listening on port 8080....')
// })