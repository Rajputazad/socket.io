const express = require('express')
const http  =require("http")
const app = express()
const socketio= require("socket.io")
const server = http.createServer(app);
const port=3000
const io = socketio(server);
io.on('connection', client => {
  client.on('msg', data => { console.log(data);});
  client.on('disconnect', () => {console.log('disconnect');});
});
server.listen(port,()=>{
    console.log("port:-"+port);
});