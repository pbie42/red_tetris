const uniqid = require('uniqid');
const Game = require('../../../classes/Game');

const {
  gamePlayersUpdateEmit,
  gameQueueUpdateEmit,
  gameSetSocketEmit,
  lobbyUpdateGamesEmit,
} = require('../emits');

function createNewGame(socket, games, roomName, player, difficulty) {
  const newGame = new Game(uniqid(), roomName, [player], difficulty);
  games.push(newGame);
  socket.join(newGame.getId());
  gameSetSocketEmit(socket, newGame);
}

function addNewPlayerToExistingRoom(io, socket, game, player) {
  game.addPlayer(player);
  socket.join(game.getId());
  gameSetSocketEmit(socket, game);
  gamePlayersUpdateEmit(io, game);
}

function addNewPlayerToRoomQueue(io, socket, game, player) {
  socket.join(game.getId());
  game.addPlayerToQueue(player);
  gameSetSocketEmit(socket, game);
  gameQueueUpdateEmit(io, game);
}

function gameCreate(io, socket, roomName, player, games, difficulty) {
  const foundGame = games.find(game => game.getRoomName() === roomName);
  if (!foundGame) createNewGame(socket, games, roomName, player, difficulty);
  else {
    const foundPlayer = foundGame.getPlayer(player.getId());
    if (!foundPlayer && foundGame.getPlayersCount() < 5) {
      addNewPlayerToExistingRoom(io, socket, foundGame, player);
    } else if (!foundPlayer && foundGame.getPlayersCount() >= 5) {
      addNewPlayerToRoomQueue(io, socket, foundGame, player);
    }
  }
  return games;
}

function handleGameCreate(io, socket, games, players, { roomName, playerID, difficulty }) {
  const foundPlayer = players.find(player => player.getId() === playerID);
  let updatedGames = games;
  if (foundPlayer) updatedGames = gameCreate(io, socket, roomName, foundPlayer, games, difficulty);
  lobbyUpdateGamesEmit(io, games);
  return updatedGames;
}

module.exports = { gameCreate, handleGameCreate };
