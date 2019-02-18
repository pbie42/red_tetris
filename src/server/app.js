const io = require('socket.io')();
const { playerSocket } = require('./channels/player/playerSocket');

let players = [];
// const rooms = [];
// const result = {};

io.on('connection', (socket) => {
  console.log('CONNECTED');

  socket.on('disconnect', () => {
    // ------------------------------------------------------------------------DISCONNECTION
    console.log('DISCONNECT');
  });

  socket.on('player', ({ payload, type }) => {
    const { updatedPlayers } = playerSocket(socket, players, { payload, type });
    players = updatedPlayers;
  });
});

const port = 7000;
io.listen(port);
console.log('listening on port', port);
