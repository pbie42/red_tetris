import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from 'client/actions';
import * as keys from 'client/components/game/keyCodes';
import checkURL from 'client/components/game/checkURL';
import Board from 'client/components/game/Board';
import 'client/style/game/Game.scss';

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

  if (!handleKeyDown && gameID && playerID && players.findIndex(p => p.id === playerID) >= 0) {
    handleKeyDown = function keyDown(e) {
      if (!e.repeat && players.findIndex(p => p.id === playerID) >= 0) {
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

  if (!listening && gameID && playerID && players.findIndex(p => p.id === playerID) >= 0) {
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
  return (
    <div className="game-page">
      <div id="boards-container">
        <div className="boards-others">
          {others.length > 0 && (
            <div className="other-container">
              <div className="other-name">
                <div>
                  {others[0].username}
                </div>
              </div>
              {Board({ board: others[0].board, type: 'other' })}
              <div className="other-leader">
                {others[0].id === leader
                  ? (
                    <div>
                      {`Leader Points: ${others[0].points}`}
                    </div>
                  ) : (
                    <div>
                      {`Points: ${others[0].points}`}
                    </div>
                  )
                }
              </div>
            </div>
          )}
          {others.length > 2 && (
            <div className="other-container">
              <div className="other-name">
                <div>
                  {others[2].username}
                </div>
              </div>
              {Board({ board: others[2].board, type: 'other' })}
              <div className="other-leader">
                {others[2].id === leader
                  ? (
                    <div>
                      {`Leader Points: ${others[2].points}`}
                    </div>
                  ) : (
                    <div>
                      {`Points: ${others[2].points}`}
                    </div>
                  )
                }
              </div>
            </div>
          )}
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
              <div className="player-points">{player ? `Points: ${player.points}` : `You are in position ${queue.findIndex(q => q.id === playerID) + 1} of the queue`}</div>
            </div>
          </div>
          <div className="player-board-background">
            {
              players.findIndex(p => p.id === playerID) >= 0
                ? Board({ board: players.find(p => p.id === playerID).board, type: 'board' })
                : Board({ board: others[4].board, type: 'board' })
            }
          </div>
        </div>
        <div className="boards-others">
          {others.length > 1 && (
            <div className="other-container">
              <div className="other-name">
                <div>
                  {others[1].username}
                </div>
              </div>
              {Board({ board: others[1].board, type: 'other' })}
              <div className="other-leader">
                {others[1].id === leader
                  ? (
                    <div>
                      {`Leader Points: ${others[1].points}`}
                    </div>
                  ) : (
                    <div>
                      {`Points: ${others[1].points}`}
                    </div>
                  )
                }
              </div>
            </div>
          )}
          {others.length > 3 && (
            <div className="other-container">
              <div className="other-name">
                <div>
                  {others[3].username}
                </div>
              </div>
              {Board({ board: others[3].board, type: 'other' })}
              <div className="other-leader">
                {others[3].id === leader
                  ? (
                    <div>
                      {`Leader Points: ${others[3].points}`}
                    </div>
                  ) : (
                    <div>
                      {`Points: ${others[3].points}`}
                    </div>
                  )
                }
              </div>
            </div>
          )}
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
