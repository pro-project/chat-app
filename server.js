const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

users = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('Session started');
  // console.log(socket)
  socket.on('setUsername', function(data){
    console.log(data);
    // console.log(users)
    // console.log(connections)
    if(users.indexOf(data) > -1){
      socket.emit('userExists', data + ' username is taken! Try some other username.');
    }
    else{
      users.push(data);
      socket.emit('userSet', {username: data});
      
      console.log(users.length + " user connected")
    }
  });
  socket.on('msg', function(data){
      //Send message to everyone
      io.sockets.emit('newmsg', data);
  })
});
http.listen(8080, function(){
  console.log('listening on localhost:8080');
});