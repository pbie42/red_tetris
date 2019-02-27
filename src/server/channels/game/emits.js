const {
  GAME_PLAYERS_UPDATE,
  GAME_QUEUE_UPDATE,
  GAME_RESET,
  GAME_SET,
  GAME_SET_ACTIVE,
  GAME_SET_NEW_LEADER,
  LOBBY_GAMES_UPDATE,
} = require('../../actions/types');

function lobbyUpdateGamesEmit(games, io) {
  io.emit('lobby', {
    payload: games,
    type: LOBBY_GAMES_UPDATE,
  });
}

function gameResetSocketEmit(socket) {
  socket.emit('game', {
    payload: {},
    type: GAME_RESET,
  });
}

function gameSetSocketEmit(game, socket) {
  socket.emit('game', {
    payload: {
      error: '',
      id: game.getId(),
      leader: game.getLeader(),
      players: game.getPlayers(),
      queue: game.getQueue(),
      roomName: game.getRoomName(),
    },
    type: GAME_SET,
  });
}

function gameSetActiveEmit(io, gameID, active) {
  io.in(gameID).emit('game', {
    payload: active,
    type: GAME_SET_ACTIVE,
  });
}

function gamePlayersUpdateEmit(io, gameID, players) {
  io.in(gameID).emit('game', {
    payload: players,
    type: GAME_PLAYERS_UPDATE,
  });
}

function gameQueueUpdateEmit(io, gameID, queue) {
  io.in(gameID).emit('game', {
    payload: queue,
    type: GAME_QUEUE_UPDATE,
  });
}

function gameNewLeaderEmit(io, gameID, leader) {
  io.in(gameID).emit('game', {
    payload: leader,
    type: GAME_SET_NEW_LEADER,
  });
}

module.exports = {
  gameNewLeaderEmit,
  gamePlayersUpdateEmit,
  gameQueueUpdateEmit,
  gameResetSocketEmit,
  gameSetActiveEmit,
  gameSetSocketEmit,
  lobbyUpdateGamesEmit,
};
