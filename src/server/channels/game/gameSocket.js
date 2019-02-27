const { handleGameCreate, handleGameStart, handleGameLeave } = require('./handlers');

function gameSocket(io, socket, games, players, { payload, type }) {
  console.log('payload', payload);
  let updatedGames = games;
  switch (type) {
    case 'GAME_CREATE':
      updatedGames = handleGameCreate(io, socket, games, players, payload);
      break;
    case 'GAME_LEAVE':
      updatedGames = handleGameLeave(io, socket, games, payload);
      break;
    case 'GAME_START':
      updatedGames = handleGameStart(io, socket, games, payload);
      break;

    default:
      break;
  }
  return { updatedGames };
}

module.exports = { gameSocket, handleGameLeave };
