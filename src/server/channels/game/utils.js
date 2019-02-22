const uniqid = require('uniqid');
const {
  GAME_PLAYERS_UPDATE,
  GAME_QUEUE_UPDATE,
  GAME_SET,
  LOBBY_GAMES_UPDATE,
} = require('../../actions/types');
const Game = require('../../classes/Game');

function lobbyUpdateGames(games, io) {
  io.emit('lobby', {
    payload: games,
    type: LOBBY_GAMES_UPDATE,
  });
}

function gameSetSocketEmit(game, socket) {
  socket.emit('game', {
    payload: {
      error: '',
      id: game.getId(),
      players: game.getPlayers(),
      queue: game.getQueue(),
      roomName: game.getRoomName(),
    },
    type: GAME_SET,
  });
}

function gamePlayersUpdateEmit(io, players, queue) {
  players.forEach((player) => {
    io.to(player.getId()).emit('game', {
      payload: players,
      type: GAME_PLAYERS_UPDATE,
    });
  });
  queue.forEach((q) => {
    io.to(q.getId()).emit('game', {
      payload: players,
      type: GAME_PLAYERS_UPDATE,
    });
  });
}

function gameQueueUpdateEmit(io, players, queue) {
  players.forEach((player) => {
    io.to(player.getId()).emit('game', {
      payload: queue,
      type: GAME_QUEUE_UPDATE,
    });
  });
  queue.forEach((q) => {
    io.to(q.getId()).emit('game', {
      payload: queue,
      type: GAME_QUEUE_UPDATE,
    });
  });
}

function gameCreate(io, socket, roomName, player, gamesArray) {
  console.log('player', player);
  const foundGame = gamesArray.find(game => game.getRoomName() === roomName);
  if (!foundGame) {
    const newGame = new Game(uniqid(), roomName, [player]);
    gamesArray.push(newGame);
    gameSetSocketEmit(newGame, socket);
    // io.emit('game', { payload: gamesArray, type: GAME_ADD });
  } else {
    const foundPlayer = foundGame.getPlayer(player.getId());
    if (!foundPlayer && foundGame.getPlayersCount() < 5) {
      foundGame.addPlayer(player);
      gameSetSocketEmit(foundGame, socket);
      gamePlayersUpdateEmit(io, foundGame.getPlayers(), foundGame.getQueue());
    } else if (!foundPlayer && foundGame.getPlayersCount() >= 5) {
      foundGame.addPlayerToQueue(player);
      gameSetSocketEmit(foundGame, socket);
      gameQueueUpdateEmit(io, foundGame.getPlayers(), foundGame.getQueue());
    }
    // socket.emit('game', { payload: roomName, type: GAME_EXISTS });
  }
  return gamesArray;
}

module.exports = {
  gameCreate,
  lobbyUpdateGames,
};
