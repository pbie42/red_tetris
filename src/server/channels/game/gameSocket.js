const { gameCreate } = require('./utils');

function gameSocket(io, socket, games, players, { payload, type }) {
  const { roomName, playerID } = payload;
  const player = players.find(playr => playr.getId() === playerID);
  let updatedGames = games;
  switch (type) {
    case 'GAME_CREATE':
      updatedGames = gameCreate(io, socket, roomName, player, games);
      break;

    default:
      break;
  }
  return { updatedGames };
}

module.exports = { gameSocket };
