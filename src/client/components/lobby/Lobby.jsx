import React from 'react';
import composeWithLogic from 'client/components/lobby/withLogic';
import requireUsername from 'client/components/hoc/requireUsername';
import PropTypes from 'prop-types';

function Lobby(props) {
  console.log('lobby created', props);
  const {
    playerID, submitGame, onChangeTextArea, newRoomName, resetTextArea,
  } = props;
  return (
    <div>
      <h1>This is the lobby page</h1>
      <input type="text" value={newRoomName} onChange={onChangeTextArea} />
      <button type="submit" onClick={submitGame(newRoomName, playerID, resetTextArea)}>Create Room</button>
    </div>
  );
}

Lobby.propTypes = {
  playerID: PropTypes.string.isRequired,
  newRoomName: PropTypes.string.isRequired,
  submitGame: PropTypes.func.isRequired,
  onChangeTextArea: PropTypes.func.isRequired,
  resetTextArea: PropTypes.func.isRequired,
};

export default requireUsername(composeWithLogic(Lobby), '/');
