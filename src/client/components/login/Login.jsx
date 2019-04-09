import React from 'react';
import PropTypes from 'prop-types';
import composeWithLogic from 'client/components/login/withLogic';
import checkForUsername from 'client/components/login/checkForUsername';
import 'client/style/Login.scss';
// import tetris from 'client/img/tetris.jpg';

function handleError(error) {
  if (error) return <h3 className="login-error">{error}</h3>;
  return <div className="login-error" />;
}

function Login({
  localUsername,
  onChangeTextArea,
  resetTextArea,
  submitPlayer,
  submitPlayerEnter,
  error,
  playerErrorReset,
}) {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-image-container" />
        <div className="login-form-container">
          <div className="login-logo" />
          <div className="login-input-container">
            <input
              className="login-input"
              type="text"
              value={localUsername}
              onChange={(e) => {
                onChangeTextArea(e);
                playerErrorReset();
              }}
              onKeyUp={submitPlayerEnter(localUsername, resetTextArea)}
              placeholder="Create a username"
            />
          </div>
          <div className="login-button-container">
            <div className="login-error-button-container">
              {handleError(error)}
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
    </div>
  );
}

Login.propTypes = {
  submitPlayer: PropTypes.func.isRequired,
  submitPlayerEnter: PropTypes.func.isRequired,
  localUsername: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChangeTextArea: PropTypes.func.isRequired,
  playerErrorReset: PropTypes.func.isRequired,
  resetTextArea: PropTypes.func.isRequired,
};

export default checkForUsername(composeWithLogic(Login));
