import React from 'react';
import composeWithLogic from 'client/components/lobby/withLogic';
import checkForGame from 'client/components/lobby/checkForGame';
import PropTypes from 'prop-types';

const renderGames = games => games.map(game => (
  <li className="game" key={game.id}>
    {game.roomName}
  </li>
));

function Lobby(props) {
  const {
    games, newRoomName, onChangeTextArea, playerID, resetTextArea, submitGame,
  } = props;
  return (
    <div>
      <h1>This is the lobby page</h1>
      <input type="text" value={newRoomName} onChange={onChangeTextArea} />
      <button
        type="submit"
        id="game-submit"
        onClick={submitGame(newRoomName, playerID, resetTextArea)}
      >
        Create Room
      </button>
      {renderGames(games)}
    </div>
  );
}

Lobby.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  playerID: PropTypes.string.isRequired,
  newRoomName: PropTypes.string.isRequired,
  submitGame: PropTypes.func.isRequired,
  onChangeTextArea: PropTypes.func.isRequired,
  resetTextArea: PropTypes.func.isRequired,
};

export default checkForGame(composeWithLogic(Lobby), '/');
