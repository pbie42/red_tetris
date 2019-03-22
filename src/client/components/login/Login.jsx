import React from 'react';
import PropTypes from 'prop-types';
import composeWithLogic from 'client/components/login/withLogic';
import checkForUsername from 'client/components/login/checkForUsername';
import 'client/style/Login.scss';
// import tetris from 'client/img/tetris.jpg';

function handleError(error) {
  if (error) return <h3>{error}</h3>;
  return '';
}

function Login({
  localUsername, onChangeTextArea, resetTextArea, submitPlayer, error,
}) {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-container">{/* <img src={tetris} alt="" /> */}</div>
        <div className="login-form-container">
          <div className="login-logo" />
          <div className="login-input-container">
            <input
              className="login-input"
              type="text"
              value={localUsername}
              onChange={onChangeTextArea}
              placeholder="Choose a username"
            />
            {handleError(error)}
          </div>
          <div className="login-button-container">
            <div>
              <button
                className="login-button"
                type="submit"
                onClick={submitPlayer(localUsername, resetTextArea)}
              >
                Join A Game
              </button>
            </div>
          </div>
        </div>
      </div>
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
