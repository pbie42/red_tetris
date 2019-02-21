import React from 'react';
import composeWithLogic from 'client/components/lobby/withLogic';
import checkForGame from 'client/components/lobby/checkForGame';
import PropTypes from 'prop-types';

function Lobby(props) {
  const {
    playerID, submitGame, onChangeTextArea, newRoomName, resetTextArea, resetGame,
  } = props;
  return (
    <div>
      <h1>This is the lobby page</h1>
      <input type="text" value={newRoomName} onChange={onChangeTextArea} />
      <button type="submit" id="game-submit" onClick={submitGame(newRoomName, playerID, resetTextArea)}>Create Room</button>
      <button type="submit" onClick={resetGame()}>Reset Room</button>
    </div>
  );
}

Lobby.propTypes = {
  playerID: PropTypes.string.isRequired,
  newRoomName: PropTypes.string.isRequired,
  submitGame: PropTypes.func.isRequired,
  onChangeTextArea: PropTypes.func.isRequired,
  resetTextArea: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default checkForGame(composeWithLogic(Lobby), '/');
