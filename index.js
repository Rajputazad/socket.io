const express = require('express')
const http  =require("http")
const app = express()
const socketio= require("socket.io")
const server = http.createServer(app);
const port=3000
// const io = socketio(server);

const io = require('socket.io')(server, {
  cors: {origin : '*'}
});

io.on('connection', client => {
  client.on('message', data => { console.log(data);
    io.emit('message', data)
}
  );
  client.on('disconnect', () => {console.log('disconnect');});
  
  client.on('typing', (data) => {
    io.emit('typing',`${data} is typing`);

  });


  client.on('typing stop', () => {
    io.emit('typing stop');
  });




});


server.listen(port,()=>{
    console.log("port:-"+port);
});