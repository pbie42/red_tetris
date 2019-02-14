const io = require('socket.io')();

// const users = [];
// const rooms = [];
// const result = {};

io.on('connection', (socket) => {
  console.log('CONNECTED');

  socket.on('disconnect', () => {
    // ------------------------------------------------------------------------DISCONNECTION
    console.log('DISCONNECT');
  });
});

const port = 7000;
io.listen(port);
console.log('listening on port', port);
