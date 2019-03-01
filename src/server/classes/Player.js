const newBoard = require('./utils/newBoard');

module.exports = class Player {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.board = newBoard();
    this.displayBoard = newBoard();
    this.current = 0;
    this.active = false;
  }

  updateBoard(updatedBoard) {
    this.board = updatedBoard;
  }

  getBoard() {
    return this.board;
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

  resetCurrent() {
    this.current = 0;
  }

  updateCurrent() {
    this.current += 1;
  }
};
