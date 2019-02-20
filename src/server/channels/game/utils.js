const uniqid = require('uniqid');
const { GAME_SET, GAME_EXISTS } = require('../../actions/types');
const Game = require('../../classes/Game');

function gameCreate(io, socket, roomName, player, gamesArray) {
  if (!gamesArray.find(game => game.getRoomName() === roomName)) {
    const newGame = new Game(uniqid(), roomName, [player]);
    gamesArray.push(newGame);
    socket.emit('game', {
      payload: {
        error: '',
        id: newGame.getId(),
        players: newGame.getPlayers(),
        queue: newGame.getQueue(),
        roomName: newGame.getRoomName(),
      },
      type: GAME_SET,
    });
    // io.emit('game', { payload: gamesArray, type: GAME_ADD });
  } else {
    socket.emit('game', { payload: roomName, type: GAME_EXISTS });
  }
  return gamesArray;
}

// function gameAddPlayer(player) {

// }

// function gameAddPlayerToQueue(player) {

// }

module.exports = {
  gameCreate,
};
