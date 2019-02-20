const { PLAYER_ADD, PLAYER_SET, PLAYER_EXISTS } = require('../../actions/types');
const Player = require('../../classes/Player');

function playerCreate(socket, username, playersArray) {
  if (!playersArray.find(user => user.getUsername() === username)) {
    playersArray.push(new Player(socket.id, username));
    socket.emit('player', { payload: { username, id: socket.id }, type: PLAYER_SET });
    socket.broadcast.emit('player', { payload: playersArray, type: PLAYER_ADD });
  } else {
    socket.emit('player', { payload: username, type: PLAYER_EXISTS });
  }
  return playersArray;
}

module.exports = {
  playerCreate,
};
