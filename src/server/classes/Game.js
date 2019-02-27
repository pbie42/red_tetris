const pieceOrder = require('./utils/pieceOrder');

module.exports = class Game {
  constructor(id, roomName, players) {
    this.id = id;
    this.roomName = roomName;
    this.players = players;
    this.queue = [];
    this.pieces = pieceOrder();
    this.active = false;
  }

  startGame() {
    this.active = true;
  }

  endGame() {
    this.active = false;
  }

  getActivity() {
    return this.active;
  }

  getPlayer(id) {
    return this.players.find(player => player.getId() === id);
  }

  getPlayers() {
    return this.players;
  }

  getPlayersCount() {
    return this.players.length;
  }

  addPlayer(player) {
    return this.players.push(player);
  }

  removePlayer(playerID) {
    this.players = this.players.filter(player => player.getId() !== playerID);
  }

  addPlayerToQueue(player) {
    return this.queue.push(player);
  }

  getNewPieces() {
    this.pieces = this.pieces.concat(pieceOrder());
  }

  getNextPiece(i) {
    return this.pieces[i];
  }

  getPieces() {
    return this.pieces;
  }

  getQueue() {
    return this.queue;
  }

  getInfo() {
    const {
      active, id, roomName, players, queue, pieces,
    } = this;
    return {
      active,
      id,
      pieces,
      players,
      queue,
      roomName,
    };
  }

  getRoomName() {
    return this.roomName;
  }

  getId() {
    return this.id;
  }
};
