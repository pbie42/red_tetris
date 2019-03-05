const { movePieceRight } = require('../movement/movement');
const { newDisplayBoardWithPiece } = require('./handleFirstPiece');
const { gamePlayersUpdateEmit } = require('../emits');

function handleGamePieceMove(io, socket, games, { gameID, playerID }, type) {
  const game = games.find(g => g.getId() === gameID);
  const player = game.getPlayers().find(p => p.getId() === playerID);
  const piece = player.getPiece();
  let newLocation;
  let newDisplayBoard;
  if (!game || !player || !piece) return games;
  switch (type) {
    case 'right':
      console.log('in right switch');
      newLocation = movePieceRight(player.getBoard(), player.getPiece());
      console.log('newLocation', newLocation);
      if (newLocation === piece.getLocation()) return games;
      console.log('newLocation is new');
      piece.setLocation(newLocation);
      newDisplayBoard = newDisplayBoardWithPiece(piece, player.getBoard());
      player.updateDisplayBoard(newDisplayBoard);
      gamePlayersUpdateEmit(io, game.getId(), game.getPlayersFront());
      return games;
    case 'left':
      console.log('left');
      break;
    case 'down':
      console.log('down');
      break;
    case 'rotate':
      console.log('rotate');
      break;
    default:
      break;
  }
  return games;
}

module.exports = {
  handleGamePieceMove,
};
