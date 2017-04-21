var express = require('express'), 
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

// start webserver on port 8080
var server =  http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);

// create a path to the directory that has my files
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

// array of all lines drawn
var line_history = [];

// event-handler for new incoming connections
io.on('connection', function (socket) {
    console.log("another user has joined the connection");
   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('line_draw', { line: line_history[i] } );
   }

   // add handler for message type "line_draw" received.
   socket.on('line_draw', function (data) {
      // add received line to line_history array
      line_history.push(data.line);
      
      // draw out the lines
      io.emit('line_draw', { line: data.line });
   });
});