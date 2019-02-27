const pieceOrder = require('./utils/pieceOrder');

module.exports = class Game {
  constructor(id, roomName, players) {
    this.id = id;
    this.roomName = roomName;
    this.players = players;
    this.queue = [];
    this.pieces = pieceOrder();
    this.active = false;
    this.leader = this.setLeader();
  }

  startGame() {
    this.active = true;
  }

  setLeader() {
    return this.players[0].getId();
  }

  getLeader() {
    return this.leader;
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

  removePlayerFromQueue(playerID) {
    this.queue = this.queue.filter(player => player.getId() !== playerID);
  }

  getPlayerFromQueue(playerID) {
    return this.queue.find(player => player.getId() === playerID);
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

  setNewLeader() {
    this.leader = this.players[0].getId();
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
