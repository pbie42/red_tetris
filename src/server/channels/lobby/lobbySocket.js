const { LOBBY_GAMES_UPDATE } = require('../../actions/types');

function lobbySocket(socket, games, event) {
  const { type } = event;
  switch (type) {
    case 'LOBBY_GET_GAMES':
      socket.emit('lobby', {
        payload: games,
        type: LOBBY_GAMES_UPDATE,
      });
      break;

    default:
      break;
  }
}

module.exports = { lobbySocket };
