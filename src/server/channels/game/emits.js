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

function lobbyUpdateGamesEmit(io, games) {
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

function gameSetSocketEmit(socket, game) {
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

function gameSetActiveEmit(io, game) {
  const gameID = game.getId();
  const active = game.getActivity();
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

function gamePlayersUpdateEmit(io, game) {
  const gameID = game.getId();
  const players = game.getPlayersFront();
  io.in(gameID).emit('game', {
    payload: players,
    type: GAME_PLAYERS_UPDATE,
  });
}

function gameQueueUpdateEmit(io, game) {
  const gameID = game.getId();
  const queue = game.getQueueFront();
  io.in(gameID).emit('game', {
    payload: queue,
    type: GAME_QUEUE_UPDATE,
  });
}

function gameNewLeaderEmit(io, game) {
  const gameID = game.getId();
  const leader = game.getLeader();
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
