const uniqid = require('uniqid');
const { GAME_SET, GAME_EXISTS } = require('../../actions/types');
const Game = require('../../classes/Game');

function gameSetSocketEmit(game, socket) {
  socket.emit('game', {
    payload: {
      error: '',
      id: game.getId(),
      players: game.getPlayers(),
      queue: game.getQueue(),
      roomName: game.getRoomName(),
    },
    type: GAME_SET,
  });
}

function gameCreate(io, socket, roomName, player, gamesArray) {
  const foundGame = gamesArray.find(game => game.getRoomName() === roomName);
  if (!foundGame) {
    const newGame = new Game(uniqid(), roomName, [player]);
    gamesArray.push(newGame);
    gameSetSocketEmit(newGame, socket);
    // io.emit('game', { payload: gamesArray, type: GAME_ADD });
  } else {
    const foundPlayer = foundGame.getPlayer(player.getId());
    if (!foundPlayer && foundGame.getPlayersCount < 5) {
      foundGame.gameAddPlayer(player);
      gameSetSocketEmit(foundGame, socket);
    } else if (!foundPlayer && foundGame.getPlayersCount === 5) {
      foundGame.addPlayerToQueue(player);
      gameSetSocketEmit(foundGame, socket);
    }
    socket.emit('game', { payload: roomName, type: GAME_EXISTS });
  }
  return gamesArray;
}

module.exports = {
  gameCreate,
};
