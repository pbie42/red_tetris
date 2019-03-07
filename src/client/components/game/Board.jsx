import React from 'react';
import PropTypes from 'prop-types';
import 'client/style/game/Board.scss';

function setColorClass(y, x, board) {
  switch (board[y][x]) {
    case 'i':
      return 'cyan';
    case 'j':
      return 'blue';
    case 'l':
      return 'orange';
    case 'o':
      return 'yellow';
    case 's':
      return 'green';
    case 't':
      return 'purple';
    case 'z':
      return 'red';
    case 'x':
      return 'black';
    default:
      return '';
  }
}

function Row(row, y, board) {
  const items = [];
  row.forEach((item, i) => {
    const x = i;
    items.push(
      <div
        key={`${x}-${y}`}
        className={`column-${x} ${setColorClass(y, x, board)} board-column`}
      />,
    );
  });
  return items;
}

function Board({ board, type }) {
  const rows = [];
  board.forEach((row, i) => {
    const y = i;
    rows.push(
      <div key={`row-${y}`} id={`row-${y}`} className="board-row">
        {Row(row, y, board)}
      </div>,
    );
  });
  return <div className={type}>{rows}</div>;
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  type: PropTypes.string.isRequired,
};

export default Board;
