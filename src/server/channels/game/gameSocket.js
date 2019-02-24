const {
  gameCreate,
  gamePlayersUpdateEmit,
  gameQueueUpdateEmit,
  gameResetSocketEmit,
  lobbyUpdateGames,
} = require('./utils');

function handleGameCreate(io, socket, games, players, payload) {
  const { roomName, playerID } = payload;
  const player = players.find(playr => playr.getId() === playerID);
  let updatedGames = games;
  if (player) updatedGames = gameCreate(io, socket, roomName, player, games);
  lobbyUpdateGames(games, io);
  return updatedGames;
}

function handleGameLeave(io, socket, games, payload) {
  const { gameID, playerID } = payload;
  let updatedGames = games;
  const game = updatedGames.find(g => g.getId() === gameID);
  if (!game || !game.getPlayer(playerID)) return updatedGames;
  game.removePlayer(playerID);
  const queue = game.getQueue();
  const playerCount = game.getPlayersCount();
  if (playerCount === 0 && queue.length === 0) {
    updatedGames = updatedGames.filter(g => g.getId() !== game.getId());
    lobbyUpdateGames(updatedGames, io);
    return updatedGames;
  }
  if (playerCount < 5 && queue.length > 0) {
    const player = queue.shift();
    game.addPlayer(player);
    gameQueueUpdateEmit(io, game.getPlayers(), game.getQueue());
  }
  gamePlayersUpdateEmit(io, game.getPlayers(), game.getQueue());
  gameResetSocketEmit(socket);
  lobbyUpdateGames(updatedGames, io);
  return updatedGames;
}

function gameSocket(io, socket, games, players, { payload, type }) {
  console.log('payload', payload);
  let updatedGames = games;
  switch (type) {
    case 'GAME_CREATE':
      updatedGames = handleGameCreate(io, socket, games, players, payload);
      break;
    case 'GAME_LEAVE':
      updatedGames = handleGameLeave(io, socket, games, payload);
      break;

    default:
      break;
  }
  return { updatedGames };
}

module.exports = { gameSocket, handleGameLeave };
