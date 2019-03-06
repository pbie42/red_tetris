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
  const updatedGames = games.filter(game => game.getId() !== gameID);
  lobbyUpdateGamesEmit(io, updatedGames);
  return updatedGames;
}

function movePlayerFromQueue(io, game) {
  const queue = game.getQueue();
  const playerQueued = queue.shift();
  game.addPlayer(playerQueued);
  gameQueueUpdateEmit(io, game);
}

function setNewLeader(io, game) {
  game.setNewLeader();
  gameNewLeaderEmit(io, game);
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
  gamePlayersUpdateEmit(io, game);
  lobbyUpdateGamesEmit(io, updatedGames);
  return updatedGames;
}

module.exports = handlePlayerLeave;
