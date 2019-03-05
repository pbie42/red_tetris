const {
  handleGameCreate,
  handleGameLeave,
  handleGamePieceMove,
  handleGameStart,
} = require('./handlers');

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
    case 'GAME_MOVE_PIECE_RIGHT':
      updatedGames = handleGamePieceMove(io, socket, games, payload, 'right');
      break;
    case 'GAME_MOVE_PIECE_LEFT':
      updatedGames = handleGamePieceMove(io, socket, games, payload, 'left');
      break;
    case 'GAME_MOVE_PIECE_DOWN':
      updatedGames = handleGamePieceMove(io, socket, games, payload, 'down');
      break;
    case 'GAME_MOVE_PIECE_ROTATE':
      updatedGames = handleGamePieceMove(io, socket, games, payload, 'rotate');
      break;

    default:
      break;
  }
  return { updatedGames };
}

module.exports = { gameSocket, handleGameLeave };
