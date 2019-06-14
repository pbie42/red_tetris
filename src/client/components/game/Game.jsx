import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from 'client/actions';
import * as keys from 'client/components/game/keyCodes';
import checkURL from 'client/components/game/checkURL';
import Board from 'client/components/game/Board';
import OtherPlayer from 'client/components/game/OtherPlayer';
import 'client/style/game/Game.scss';
import { handleStatus, handleUsername } from 'client/components/game/utils';

let handleKeyDown;

function Game(props) {
  const {
    gameID,
    gameMovePieceRight,
    gameMovePieceLeft,
    gameMovePieceDown,
    gameMovePieceDrop,
    gameMovePieceRotate,
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
    queue,
  } = props;

  const playerIndex = players.findIndex(p => p.id === playerID) >= 0;

  if (!handleKeyDown && gameID && playerID && playerIndex) {
    handleKeyDown = function keyDown(e) {
      if (!e.repeat && playerIndex) {
        switch (e.keyCode) {
          case keys.ARROW_UP:
            gameMovePieceRotate(gameID, playerID);
            break;
          case keys.ARROW_DOWN:
            gameMovePieceDown(gameID, playerID);
            break;
          case keys.ARROW_LEFT:
            gameMovePieceLeft(gameID, playerID);
            break;
          case keys.ARROW_RIGHT:
            gameMovePieceRight(gameID, playerID);
            break;
          case keys.SPACE_BAR:
            gameMovePieceDrop(gameID, playerID);
            break;
          default:
            break;
        }
      }
    };
  }

  if (!listening && gameID && playerID && playerIndex) {
    gameSetListener(true);
    document.addEventListener('keydown', handleKeyDown, true);
  }
  window.addEventListener('beforeunload', (e) => {
    document.removeEventListener('keydown', handleKeyDown, true);
    handleKeyDown = undefined;
    e.preventDefault();
    gameLeave(playerID, gameID);
    playerRemove(username, playerID);
  });
  const others = players.filter(player => player.id !== playerID);
  const player = players.find(p => p.id === playerID);

  if (!gameID) return <Redirect to="/lobby" />;

  let winner = '';
  if (players.length > 1 && players.filter(p => p.active).length === 1) {
    winner = players.find(p => p.active).id;
  }

  const status = handleStatus(player, others, winner, leader, gameIsActive);
  return (
    <div className="game-page">
      <div id="boards-container">
        <div className="boards-others">
          {others.length > 0 && (OtherPlayer({
            player: others[0], leader, winner, gameIsActive,
          }))}
          {others.length > 2 && (OtherPlayer({
            player: others[2], leader, winner, gameIsActive,
          }))}
        </div>
        <div className="player-board-container">
          <div className="player-board-info">
            <div className="player-buttons-container">
              <button
                className={`player-button-leave ${playerID !== leader || gameIsActive ? 'round-bottom-right' : ''}`}
                type="submit"
                onClick={() => {
                  document.removeEventListener('keydown', handleKeyDown, true);
                  handleKeyDown = undefined;
                  gameLeave(playerID, gameID);
                }}
              >
                Leave Game
              </button>
              {leader === playerID && !gameIsActive && (
                <button
                  className="player-button-start"
                  type="submit"
                  onClick={() => gameStart(gameID, playerID)}
                >
                  Start Game
                </button>
              )}
            </div>
            <div className="player-info-container">
              <div className="player-name-status-container">
                <div className="player-name">
                  { player ? handleUsername(player.username) : handleUsername(others[4].username) }
                </div>
                <div className="player-status">
                  { status }
                </div>
              </div>
              <div className="player-points">{player ? `Points: ${player.points}` : `You are in queue position ${queue.findIndex(q => q.id === playerID) + 1}`}</div>
            </div>
          </div>
          <div className="player-board-background">
            {
              playerIndex
                ? Board({ board: players.find(p => p.id === playerID).board, type: 'board' })
                : Board({ board: others[4].board, type: 'board' })
            }
          </div>
        </div>
        <div className="boards-others">
          {others.length > 1 && (OtherPlayer({
            player: others[1], leader, winner, gameIsActive,
          }))}
          {others.length > 3 && (OtherPlayer({
            player: others[3], leader, winner, gameIsActive,
          }))}
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
  gameMovePieceDown: PropTypes.func.isRequired,
  gameMovePieceDrop: PropTypes.func.isRequired,
  gameMovePieceRight: PropTypes.func.isRequired,
  gameMovePieceRotate: PropTypes.func.isRequired,
  gameMovePieceLeft: PropTypes.func.isRequired,
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
  queue: PropTypes.arrayOf(
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
    queue: state.game.queue,
  };
}

export default checkURL(
  connect(
    mapStateToProps,
    actions,
  )(Game),
);
