import React from 'react';
import PropTypes from 'prop-types';
import composeWithLogic from 'client/components/login/withLogic';

function handleError(error) {
  if (error) return <h3>{error}</h3>;
  return '';
}

function Login({
  username, onChangeTextArea, submitPlayer, resetTextArea, error,
}) {
  return (
    <div>
      <input type="text" value={username} onChange={onChangeTextArea} />
      <button type="submit" onClick={submitPlayer(username, resetTextArea)}>
        Join
      </button>
      {handleError(error)}
    </div>
  );
}

Login.propTypes = {
  submitPlayer: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChangeTextArea: PropTypes.func.isRequired,
  resetTextArea: PropTypes.func.isRequired,
};

export default composeWithLogic(Login);
