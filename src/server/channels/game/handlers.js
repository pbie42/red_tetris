const uniqid = require('uniqid');
const Game = require('../../classes/Game');
const {
  gameNewLeaderEmit,
  gamePlayersUpdateEmit,
  gameQueueUpdateEmit,
  gameResetSocketEmit,
  gameSetActiveEmit,
  gameSetSocketEmit,
  lobbyUpdateGamesEmit,
} = require('./emits');

function gameCreate(io, socket, roomName, player, gamesArray) {
  console.log('player', player);
  const foundGame = gamesArray.find(game => game.getRoomName() === roomName);
  if (!foundGame) {
    const newGame = new Game(uniqid(), roomName, [player]);
    gamesArray.push(newGame);
    socket.join(newGame.getId());
    gameSetSocketEmit(newGame, socket);
  } else {
    const foundPlayer = foundGame.getPlayer(player.getId());
    if (!foundPlayer && foundGame.getPlayersCount() < 5) {
      foundGame.addPlayer(player);
      socket.join(foundGame.getId());
      gameSetSocketEmit(foundGame, socket);
      gamePlayersUpdateEmit(io, foundGame.getId(), foundGame.getPlayers());
    } else if (!foundPlayer && foundGame.getPlayersCount() >= 5) {
      socket.join(foundGame.getId());
      foundGame.addPlayerToQueue(player);
      gameSetSocketEmit(foundGame, socket);
      gameQueueUpdateEmit(io, foundGame.getId(), foundGame.getQueue());
    }
  }
  return gamesArray;
}

function handleGameCreate(io, socket, games, players, payload) {
  const { roomName, playerID } = payload;
  const player = players.find(playr => playr.getId() === playerID);
  let updatedGames = games;
  if (player) updatedGames = gameCreate(io, socket, roomName, player, games);
  lobbyUpdateGamesEmit(games, io);
  return updatedGames;
}

function handleQueuerLeave(io, socket, game, playerID) {
  game.removePlayerFromQueue(playerID);
  gameResetSocketEmit(socket);
  gameQueueUpdateEmit(io, game.getId(), game.getQueue());
}

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
  gamePlayersUpdateEmit(io, gameID, game.getPlayers());
  lobbyUpdateGamesEmit(updatedGames, io);
  return updatedGames;
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
  game.getPlayers.forEach(player => player.setActivity(true));
  gameSetActiveEmit(io, game.getId(), game.getActivity());
  lobbyUpdateGamesEmit(updatedGames, io);
  return updatedGames;
}

module.exports = {
  gameCreate,
  handleGameCreate,
  handleGameLeave,
  handleGameStart,
};
