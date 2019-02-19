import React from 'react';
import requireLocationState from 'client/components/setup/requireLocationState';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';

function Setup(props) {
  console.log('props setup', props);
  const { username, playerCreate, location } = props;
  if (!username) {
    playerCreate(location.state.player);
  } else {
    return <Redirect to="/lobby" />;
  }

  return (
    <div>
      <h1>Setting up game</h1>
    </div>
  );
}

Setup.propTypes = {
  username: PropTypes.string.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  playerCreate: PropTypes.func.isRequired,
};

export default requireLocationState(Setup);
