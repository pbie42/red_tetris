import React from 'react';
import composeWithLogic from 'client/components/lobby/withLogic';
import checkForGame from 'client/components/lobby/checkForGame';
import PropTypes from 'prop-types';
import 'client/style/Lobby.scss';

export const renderGames = (games, gameCreate, playerID) => games.map(game => (
  <div className="lobby-game" key={game.id}>
    <div className="lobby-game-room-players">
      <div className="lobby-players">
        <h3>Players</h3>
        <h4>
          {`${game.players.length}/5`}
        </h4>
      </div>
      <div className="lobby-room-players-divider">
        <div className="divider" />
      </div>
      <div className="lobby-room">
        <h3>{game.roomName}</h3>
        <div className="lobby-join">
          <div className="lobby-status-container">
            <div className="lobby-game-status">Pending</div>
          </div>
          <div className="lobby-join-container">
            <button type="submit" className="lobby-join-button" onClick={() => gameCreate(game.roomName, playerID)}>Join</button>
          </div>
        </div>
      </div>
    </div>
  </div>
));

function Lobby(props) {
  const {
    gameCreate,
    games,
    newRoomName,
    onChangeTextArea,
    playerID,
    resetTextArea,
    submitGame,
    submitGameEnter,
    gameSetDifficulty,
    difficulty,
  } = props;
  return (
    <div className="lobby-page">
      <div className="lobby-container">
        <div className="lobby-logo-container">
          <div className="lobby-logo" />
        </div>
        <div className="lobby-create-list-container">
          <div className="lobby-create-container">
            <div className="lobby-input-button-container">
              <input
                className="lobby-input"
                placeholder="Enter New Game Name"
                type="text"
                value={newRoomName}
                onChange={onChangeTextArea}
                onKeyUp={submitGameEnter(newRoomName, playerID, resetTextArea, difficulty)}
              />
              <div className="lobby-button">
                <button
                  type="button"
                  id="game-difficulty"
                  onClick={() => gameSetDifficulty(0.2)}
                >
                  Pro
                </button>
              </div>

              <div className="lobby-button">
                <button
                  type="button"
                  id="game-difficulty"
                  onClick={() => gameSetDifficulty(0.5)}
                >
                  Intermediate
                </button>
              </div>

              <div className="lobby-button">
                <button
                  type="button"
                  id="game-difficulty"
                  onClick={() => gameSetDifficulty(1)}
                >
                  Beginner
                </button>
              </div>

              <div className="lobby-button">
                <button
                  type="submit"
                  id="game-submit"
                  onClick={submitGame(newRoomName, playerID, resetTextArea, difficulty)}
                >
                  Add Game
                </button>
              </div>
            </div>
          </div>
          <div className="lobby-list-container">
            <div className="lobby-list">
              {renderGames(games, gameCreate, playerID)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Lobby.propTypes = {
  gameCreate: PropTypes.func.isRequired,
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  newRoomName: PropTypes.string.isRequired,
  onChangeTextArea: PropTypes.func.isRequired,
  playerID: PropTypes.string.isRequired,
  resetTextArea: PropTypes.func.isRequired,
  submitGame: PropTypes.func.isRequired,
  submitGameEnter: PropTypes.func.isRequired,
  gameSetDifficulty: PropTypes.func.isRequired,
  difficulty: PropTypes.number.isRequired,
};

export default checkForGame(composeWithLogic(Lobby), '/');
