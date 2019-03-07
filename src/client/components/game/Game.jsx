import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from 'client/actions';
import * as keys from 'client/components/game/keyCodes';
import checkURL from 'client/components/game/checkURL';
import Board from 'client/components/game/Board';
import 'client/style/game/Game.scss';

function handleKeyDown(props) {
  const {
    gameID,
    playerID,
    gameMovePieceRight,
    gameMovePieceLeft,
    gameMovePieceDown,
    gameMovePieceRotate,
  } = props;
  return function keyDown(e) {
    switch (e.keyCode) {
      case keys.ARROW_UP:
        console.log('ARROW_UP');
        gameMovePieceRotate(gameID, playerID);
        break;
      case keys.ARROW_DOWN:
        console.log('ARROW_DOWN');
        gameMovePieceDown(gameID, playerID);
        break;
      case keys.ARROW_LEFT:
        console.log('ARROW_LEFT');
        gameMovePieceLeft(gameID, playerID);
        break;
      case keys.ARROW_RIGHT:
        console.log('ARROW_RIGHT');
        gameMovePieceRight(gameID, playerID);
        break;
      case keys.SPACE_BAR:
        console.log('SPACE_BAR');
        break;

      default:
        break;
    }
  };
}

function Game(props) {
  const {
    gameID,
    gameIsActive,
    gameLeave,
    gameSetListener,
    gameStart,
    leader,
    listening,
    playerID,
    playerRemove,
    players,
    username,
  } = props;
  console.log('game rendered');

  if (!listening) {
    gameSetListener(true);
    document.addEventListener('keydown', handleKeyDown(props));
  }
  window.addEventListener('beforeunload', (e) => {
    document.removeEventListener('keydown', handleKeyDown(props));
    e.preventDefault();
    gameLeave(playerID, gameID);
    playerRemove(username, playerID);
  });
  const others = players.filter(player => player.id !== playerID);
  if (!gameID) return <Redirect to="/lobby" />;
  return (
    <div>
      <button type="submit" onClick={() => gameLeave(playerID, gameID)}>
        Leave Game
      </button>
      {leader === playerID && !gameIsActive && (
        <button type="submit" onClick={() => gameStart(gameID, playerID)}>
          Start Game
        </button>
      )}
      <h1 id="game-title">This is the game page</h1>
      <div id="boards-container">
        <div className="boards-others">
          {others.length > 0 && Board({ board: others[0].board, type: 'other' })}
          {others.length > 2 && Board({ board: others[2].board, type: 'other' })}
        </div>
        {Board({ board: players.find(p => p.id === playerID).board, type: 'board' })}
        <div className="boards-others">
          {others.length > 1 && Board({ board: others[1].board, type: 'other' })}
          {others.length > 3 && Board({ board: others[3].board, type: 'other' })}
        </div>
      </div>
    </div>
  );
}

Game.propTypes = {
  gameIsActive: PropTypes.bool.isRequired,
  gameID: PropTypes.string.isRequired,
  gameLeave: PropTypes.func.isRequired,
  gameSetListener: PropTypes.func.isRequired,
  gameStart: PropTypes.func.isRequired,
  leader: PropTypes.string.isRequired,
  listening: PropTypes.bool.isRequired,
  playerID: PropTypes.string.isRequired,
  playerRemove: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
      board: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      ),
    }),
  ).isRequired,
  username: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    gameIsActive: state.game.active,
    listening: state.game.listening,
    gameID: state.game.id,
    leader: state.game.leader,
    playerID: state.player.id,
    players: state.game.players,
    username: state.player.username,
  };
}

export default checkURL(
  connect(
    mapStateToProps,
    actions,
  )(Game),
);
