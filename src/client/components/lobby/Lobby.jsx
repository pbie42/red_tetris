import React from 'react';
import composeWithLogic from 'client/components/lobby/withLogic';
import checkForGame from 'client/components/lobby/checkForGame';
import PropTypes from 'prop-types';
import 'client/style/Lobby.scss';

export const renderGames = (games, gameCreate, playerID) => games.map(game => (
  <li className="game" key={game.id}>
    <button type="submit" className="game-button" onClick={() => gameCreate(game.roomName, playerID)}>{game.roomName}</button>
  </li>
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
  } = props;
  return (
    <div className="lobby-page">
      <div className="lobby-container">
        <div className="lobby-logo-container">
          <div className="lobby-logo" />
        </div>
        <div className="lobby-create-list-container">
          <div className="lobby-create-container">
            <input type="text" value={newRoomName} onChange={onChangeTextArea} />
            <button
              type="submit"
              id="game-submit"
              onClick={submitGame(newRoomName, playerID, resetTextArea)}
            >
              Create Room
            </button>
          </div>
          <div className="lobby-list-container">
            {renderGames(games, gameCreate, playerID)}
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
};

export default checkForGame(composeWithLogic(Lobby), '/');
