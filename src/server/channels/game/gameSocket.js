const { gameCreate } = require('./utils');

function gameSocket(io, socket, games, players, { payload, type }) {
  console.log('payload', payload);
  const { roomName, playerID } = payload;
  const player = players.find(playr => playr.getId() === playerID);
  let updatedGames = games;
  switch (type) {
    case 'GAME_CREATE':
      if (player) updatedGames = gameCreate(io, socket, roomName, player, games);
      break;

    default:
      break;
  }
  return { updatedGames };
}

module.exports = { gameSocket };
