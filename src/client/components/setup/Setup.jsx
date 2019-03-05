import React from 'react';
import requireLocationState from 'client/components/setup/requireLocationState';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';

function Setup(props) {
  const {
    username, playerID, roomName, playerCreate, location, gameCreate, playerError,
  } = props;
  if (playerError) return <Redirect to="/" />;
  if (!username) {
    playerCreate(location.state.player);
  } else if (!roomName) {
    gameCreate(location.state.game, playerID);
  } else return <Redirect to={{ pathname: `/${roomName}[${username}]` }} />;

  return (
    <div>
      <h1>Setting up game</h1>
    </div>
  );
}

Setup.propTypes = {
  username: PropTypes.string.isRequired,
  playerID: PropTypes.string.isRequired,
  playerError: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  playerCreate: PropTypes.func.isRequired,
  gameCreate: PropTypes.func.isRequired,
};

export default requireLocationState(Setup);
