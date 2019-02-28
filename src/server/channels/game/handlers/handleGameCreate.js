const uniqid = require('uniqid');
const Game = require('../../../classes/Game');

const {
  gamePlayersUpdateEmit,
  gameQueueUpdateEmit,
  gameSetSocketEmit,
  lobbyUpdateGamesEmit,
} = require('../emits');

function createNewGame(socket, gamesArray, roomName, player) {
  const newGame = new Game(uniqid(), roomName, [player]);
  gamesArray.push(newGame);
  socket.join(newGame.getId());
  gameSetSocketEmit(newGame, socket);
}

function addNewPlayerToExistingRoom(io, socket, foundGame, player) {
  foundGame.addPlayer(player);
  socket.join(foundGame.getId());
  gameSetSocketEmit(foundGame, socket);
  gamePlayersUpdateEmit(io, foundGame.getId(), foundGame.getPlayers());
}

function addNewPlayerToRoomQueue(io, socket, foundGame, player) {
  socket.join(foundGame.getId());
  foundGame.addPlayerToQueue(player);
  gameSetSocketEmit(foundGame, socket);
  gameQueueUpdateEmit(io, foundGame.getId(), foundGame.getQueue());
}

function gameCreate(io, socket, roomName, player, gamesArray) {
  const foundGame = gamesArray.find(game => game.getRoomName() === roomName);
  if (!foundGame) createNewGame(socket, gamesArray, roomName, player);
  else {
    const foundPlayer = foundGame.getPlayer(player.getId());
    if (!foundPlayer && foundGame.getPlayersCount() < 5) {
      addNewPlayerToExistingRoom(io, socket, foundGame, player);
    } else if (!foundPlayer && foundGame.getPlayersCount() >= 5) {
      addNewPlayerToRoomQueue(io, socket, foundGame, player);
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

module.exports = { gameCreate, handleGameCreate };
