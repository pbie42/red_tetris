const handlePlayerLeave = require('./handlers/handlePlayerLeave');
const { handleGameCreate, gameCreate } = require('./handlers/handleGameCreate');
const {
  gameQueueUpdateEmit,
  gameResetSocketEmit,
  gameSendFirstPieceEmit,
  gameSetActiveEmit,
  lobbyUpdateGamesEmit,
} = require('./emits');

function handleQueuerLeave(io, socket, game, playerID) {
  game.removePlayerFromQueue(playerID);
  gameResetSocketEmit(socket);
  gameQueueUpdateEmit(io, game.getId(), game.getQueueFront());
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

function handleGameStart(io, socket, games, payload) {
  const updatedGames = games;
  const { gameID, playerID } = payload;
  const game = updatedGames.find(g => g.getId() === gameID);
  if (!game) return updatedGames;
  if (game.getLeader() !== playerID) return updatedGames;
  game.startGame();
  game.getPlayers().forEach(player => player.setActivity(true));
  gameSetActiveEmit(io, game.getId(), game.getActivity());
  gameSendFirstPieceEmit(io, game);
  lobbyUpdateGamesEmit(updatedGames, io);
  return updatedGames;
}

module.exports = {
  gameCreate,
  handleGameCreate,
  handleGameLeave,
  handleGameStart,
};
