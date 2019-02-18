import React from 'react';
// import checkURL from 'client/components/game/checkURL';
import PropTypes from 'prop-types';

function Game(props) {
  const { username } = props;
  console.log('username game', username);

  return (
    <div>
      <h1>This is the game page</h1>
    </div>
  );
}

Game.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Game;
