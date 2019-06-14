const Piece = require('./Piece');
const newBoard = require('./utils/newBoard');

module.exports = class Player {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.board = newBoard();
    this.displayBoard = newBoard();
    this.current = 0;
    this.active = false;
    this.piece = {};
    this.points = 0;
  }

  updateBoard(updatedBoard) {
    this.board = updatedBoard;
  }

  getBoard() {
    return this.board;
  }

  getDisplayBoard() {
    return this.displayBoard;
  }

  updateDisplayBoard(updatedBoard) {
    this.displayBoard = updatedBoard;
  }

  resetBoards() {
    this.board = newBoard();
    this.displayBoard = newBoard();
  }

  resetPoints() {
    this.points = 0;
  }

  getInfo() {
    const { id, username, board } = this;
    return { id, username, board };
  }

  getUsername() {
    return this.username;
  }

  getId() {
    return this.id;
  }

  getActivity() {
    return this.active;
  }

  setActivity(bool) {
    this.active = bool;
  }

  setPiece(letter, position) {
    this.piece = new Piece(letter, position);
  }

  getPiece() {
    return this.piece;
  }

  getCurrent() {
    return this.current;
  }

  resetCurrent() {
    this.current = 0;
  }

  updateCurrent() {
    this.current += 1;
  }

  addPoints(rows) {
    switch (rows) {
      case 1:
        this.points += 40;
        break;
      case 2:
        this.points += 100;
        break;
      case 3:
        this.points += 300;
        break;
      case 4:
        this.points += 1200;
        break;
      default:
        break;
    }
  }
};
