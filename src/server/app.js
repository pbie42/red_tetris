const io = require('socket.io')();
const { playerSocket } = require('./channels/player/playerSocket');
const { gameSocket } = require('./channels/game/gameSocket');

let players = [];
let games = [];
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

  socket.on('game', ({ payload, type }) => {
    console.log('game channel', payload, type);

    const { updatedGames } = gameSocket(io, socket, games, players, { payload, type });
    games = updatedGames;
  });
});

const port = 7000;
io.listen(port);
console.log('listening on port', port);
