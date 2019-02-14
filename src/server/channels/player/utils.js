const { PLAYER_SET, PLAYER_EXISTS } = require('../../actions/types');
const Player = require('./Player');

function playerCreate(socket, username, playersArray) {
  if (!playersArray.find(user => user.getUsername() === username)) {
    playersArray.push(new Player(socket.id, username));
    socket.emit('player', { payload: username, type: PLAYER_SET });
  } else {
    socket.emit('player', { payload: username, type: PLAYER_EXISTS });
  }
  return playersArray;
}

module.exports = {
  playerCreate,
};
