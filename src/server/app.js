const config = { pingTimeout: 60000, pingInterval: 2000 };
const io = require('socket.io')(null, config);
const { playerSocket } = require('./channels/player/playerSocket');
const { gameSocket } = require('./channels/game/gameSocket');
const { lobbySocket } = require('./channels/lobby/lobbySocket');

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
    const { updatedGames } = gameSocket(io, socket, games, players, { payload, type });
    games = updatedGames;
  });

  socket.on('lobby', ({ payload, type }) => {
    lobbySocket(socket, games, { payload, type });
  });
});

const port = 7000;
io.listen(port);
console.log('listening on port', port);
