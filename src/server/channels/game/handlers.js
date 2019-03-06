const handlePlayerLeave = require('./handlers/handlePlayerLeave');
const { handleFirstPiece } = require('./handlers/handleFirstPiece');
const { handleGamePieceMove } = require('./handlers/handleMovement');
const { handleGameCreate, gameCreate } = require('./handlers/handleGameCreate');
const {
  gamePieceMoveDownEmit,
  gameQueueUpdateEmit,
  gameResetSocketEmit,
  gameSetActiveEmit,
  lobbyUpdateGamesEmit,
} = require('./emits');

function handleQueuerLeave(io, socket, game, playerID) {
  game.removePlayerFromQueue(playerID);
  gameResetSocketEmit(socket);
  gameQueueUpdateEmit(io, game);
}

function handleGameLeave(io, socket, games, payload) {
  const { gameID, playerID } = payload;
  const updatedGames = games;
  const game = updatedGames.find(g => g.getId() === gameID);
  if (!game) return updatedGames;
  const player = game.getPlayer(playerID);
  const queuer = game.getPlayerFromQueue(playerID);
  if (!player && !queuer) return updatedGames;
  if (player) {
    player.setActivity(false);
    return handlePlayerLeave(io, socket, updatedGames, game, playerID);
  }
  handleQueuerLeave(io, socket, game, playerID);
  return updatedGames;
}

function handleGameStart(io, socket, games, { gameID, playerID }) {
  const updatedGames = games;
  const gameToStart = updatedGames.find(game => game.getId() === gameID);
  if (!gameToStart) return updatedGames;
  if (gameToStart.getLeader() !== playerID) return updatedGames;
  gameToStart.startGame();
  gameToStart.getPlayers().forEach(player => player.setActivity(true));
  gameSetActiveEmit(io, gameToStart);
  handleFirstPiece(io, gameToStart);
  lobbyUpdateGamesEmit(io, updatedGames);
  gameToStart.setAutoDrop(setInterval(() => gamePieceMoveDownEmit(socket, gameToStart), 1000));
  return updatedGames;
}

module.exports = {
  gameCreate,
  handleGameCreate,
  handleGameLeave,
  handleGamePieceMove,
  handleGameStart,
};
