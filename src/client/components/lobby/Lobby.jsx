import React from 'react';
import Sound from 'react-sound';
import composeWithLogic from 'client/components/lobby/withLogic';
import checkForGame from 'client/components/lobby/checkForGame';
import PropTypes from 'prop-types';
import 'client/style/Lobby.scss';
import soundtrack from '../../../assets/TetrisSoundtrack.mp3';

function difficultyClass(difficulty) {
  switch (difficulty) {
    case 1:
      return 'session';
    case 0.5:
      return 'pending';
    case 0.2:
      return 'hard';
    default:
      return '';
  }
}

function difficultyDisplay(difficulty) {
  switch (difficulty) {
    case 1:
      return 'Easy';
    case 0.5:
      return 'Medium';
    case 0.2:
      return 'Hard';
    default:
      return '';
  }
}

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
            <div className={`lobby-game-status ${game.active ? 'session' : 'pending'}`}>
              {game.active ? 'In Session' : 'Waiting...'}
            </div>
            <div className={`lobby-game-status ${difficultyClass(game.difficulty)}`}>
              <div className="lobby-game-difficulty">Difficulty: </div>
              {difficultyDisplay(game.difficulty)}
            </div>
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
              <div className="lobby-buttons-container">
                <button
                  type="button"
                  className={`game-difficulty ${difficulty === 1 ? 'easy' : ''}`}
                  onClick={() => gameSetDifficulty(1)}
                >
                  Easy
                </button>
                <button
                  type="button"
                  className={`game-difficulty ${difficulty === 0.5 ? 'medium' : ''}`}
                  onClick={() => gameSetDifficulty(0.5)}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={`game-difficulty ${difficulty === 0.2 ? 'hard' : ''}`}
                  onClick={() => gameSetDifficulty(0.2)}
                >
                  Hard
                </button>
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
            <Sound
              url={soundtrack}
              playStatus={Sound.status.PLAYING}
              loop="true"
            />
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
