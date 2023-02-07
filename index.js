const express = require('express')
const http  =require("http")
const app = express()
const socketio= require("socket.io")
const server = http.createServer(app);
const port=3000
// const io = socketio(server);
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:4200", "*"],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id,authorization");

  next();
});
const io = require('socket.io')(server, {
  cors: {origin : '*'}
});

io.on('connection', client => {
  client.on('message', data => { console.log(data);
    io.emit('message', `${client.id.substr(0, 2)}: ${data}`)
}
  );
  client.on('disconnect', () => {console.log('disconnect');});
});
server.listen(port,()=>{
    console.log("port:-"+port);
});