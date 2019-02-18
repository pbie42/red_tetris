const { playerCreate } = require('./utils');

function playerSocket(socket, players, { payload, type }) {
  let updatedPlayers = players;
  switch (type) {
    case 'PLAYER_CREATE':
      updatedPlayers = playerCreate(socket, payload, players);
      break;

    default:
      break;
  }
  return { updatedPlayers };
}

module.exports = { playerSocket };
