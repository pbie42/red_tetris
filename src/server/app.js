const io = require('socket.io')();
const { playerCreate } = require('./channels/player/utils');

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
    switch (type) {
      case 'PLAYER_CREATE':
        players = playerCreate(socket, payload, players);
        break;

      default:
        break;
    }
  });
});

const port = 7000;
io.listen(port);
console.log('listening on port', port);
