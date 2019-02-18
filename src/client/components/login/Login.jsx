import React from 'react';
import PropTypes from 'prop-types';
import composeWithLogic from 'client/components/login/withLogic';
import checkForUsername from 'client/components/login/checkForUsername';

function handleError(error) {
  if (error) return <h3>{error}</h3>;
  return '';
}

function Login({
  localUsername, onChangeTextArea, submitPlayer, resetTextArea, error,
}) {
  return (
    <div>
      <input type="text" value={localUsername} onChange={onChangeTextArea} />
      <button type="submit" onClick={submitPlayer(localUsername, resetTextArea)}>
        Join
      </button>
      {handleError(error)}
    </div>
  );
}

Login.propTypes = {
  submitPlayer: PropTypes.func.isRequired,
  localUsername: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChangeTextArea: PropTypes.func.isRequired,
  resetTextArea: PropTypes.func.isRequired,
};

export default checkForUsername(composeWithLogic(Login));
