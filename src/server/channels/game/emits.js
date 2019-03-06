const {
  GAME_MOVE_PIECE_DOWN,
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
    payload: games.map(g => g.getInfoFront()),
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
      players: game.getPlayersFront(),
      queue: game.getQueueFront(),
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

function gamePieceMoveDownEmit(socket, game) {
  game.getPlayers().forEach((p) => {
    if (p.getActivity) {
      socket.emit('game', {
        payload: {
          gameID: game.getId(),
          playerID: p.getId(),
        },
        type: GAME_MOVE_PIECE_DOWN,
      });
    }
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
  gamePieceMoveDownEmit,
  gamePlayersUpdateEmit,
  gameQueueUpdateEmit,
  gameResetSocketEmit,
  gameSetActiveEmit,
  gameSetSocketEmit,
  lobbyUpdateGamesEmit,
};
