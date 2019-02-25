import React from 'react';
import * as keys from 'client/components/game/keyCodes';

function handleKeyDown(e) {
  switch (e.keyCode) {
    case keys.ARROW_UP:
      console.log('ARROW_UP');
      break;
    case keys.ARROW_DOWN:
      console.log('ARROW_DOWN');
      break;
    case keys.ARROW_LEFT:
      console.log('ARROW_LEFT');
      break;
    case keys.ARROW_RIGHT:
      console.log('ARROW_RIGHT');
      break;
    case keys.SPACE_BAR:
      console.log('SPACE_BAR');
      break;

    default:
      break;
  }
}

function Board() {
  document.addEventListener('keydown', handleKeyDown);
  return (
    <div>
      <h1>This is a board</h1>
    </div>
  );
}

Board.propTypes = {};

export default Board;
