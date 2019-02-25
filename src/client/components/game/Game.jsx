import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from 'client/actions';
import * as keys from 'client/components/game/keyCodes';
import checkURL from 'client/components/game/checkURL';
import Board from 'client/components/game/Board';
import 'client/style/game/Game.scss';

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

function Game(props) {
  const {
    gameLeave, playerID, gameID, players,
  } = props;
  document.addEventListener('keydown', handleKeyDown);
  if (!gameID) return <Redirect to="/lobby" />;
  return (
    <div>
      <button type="submit" onClick={() => gameLeave(playerID, gameID)}>
        Leave Game
      </button>
      <h1 id="game-title">This is the game page</h1>
      {Board({ board: players[0].board })}
    </div>
  );
}

Game.propTypes = {
  gameID: PropTypes.string.isRequired,
  gameLeave: PropTypes.func.isRequired,
  playerID: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.objectOf({
    id: PropTypes.string,
    username: PropTypes.string,
    board: PropTypes.arrayOf(PropTypes.array),
  })).isRequired,
};

function mapStateToProps(state) {
  return {
    playerID: state.player.id,
    gameID: state.game.id,
    players: state.game.players,
  };
}

export default checkURL(
  connect(
    mapStateToProps,
    actions,
  )(Game),
);
