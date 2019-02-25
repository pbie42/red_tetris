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
    default:
      return '';
  }
}

function Row(row, y, board) {
  const items = [];
  row.forEach((item, x) => {
    items.push(<div className={`column-${x} ${setColorClass(y, x, board)} board-column`} />);
  });
  return items;
}

function Board({ board }) {
  const rows = [];
  board.forEach((row, i) => {
    rows.push(
      <div id={`row-${i}`} className="board-row">
        {Row(row, i, board)}
      </div>,
    );
  });
  return <div className="board">{rows}</div>;
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default Board;
