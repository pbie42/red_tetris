const {
  gameNewLeaderEmit,
  gamePlayersUpdateEmit,
  gameQueueUpdateEmit,
  gameResetSocketEmit,
  lobbyUpdateGamesEmit,
} = require('../emits');

function removePlayer(socket, game, playerID) {
  game.removePlayer(playerID);
  socket.leave(game.getId());
  gameResetSocketEmit(socket);
}

function removeGame(io, games, gameID) {
  const updatedGames = games.filter(g => g.getId() !== gameID);
  lobbyUpdateGamesEmit(updatedGames, io);
  return updatedGames;
}

function movePlayerFromQueue(io, game) {
  const queue = game.getQueue();
  const playerQueued = queue.shift();
  game.addPlayer(playerQueued);
  gameQueueUpdateEmit(io, game.getId(), queue);
}

function setNewLeader(io, game) {
  game.setNewLeader();
  gameNewLeaderEmit(io, game.getId(), game.getLeader());
}

function handlePlayerLeave(io, socket, games, game, playerID) {
  const updatedGames = games;
  const gameID = game.getId();
  removePlayer(socket, game, playerID);
  const queue = game.getQueue();
  const playerCount = game.getPlayersCount();
  if (playerCount === 0 && queue.length === 0) return removeGame(io, games, gameID);
  if (playerCount < 5 && queue.length > 0) movePlayerFromQueue(io, game);
  if (playerID === game.getLeader()) setNewLeader(io, game);
  gamePlayersUpdateEmit(io, gameID, game.getPlayersFront());
  lobbyUpdateGamesEmit(updatedGames, io);
  return updatedGames;
}

module.exports = handlePlayerLeave;
