import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from 'client/actions';
import checkURL from 'client/components/game/checkURL';

function Game(props) {
  const {
    username, gameLeave, playerID, gameID,
  } = props;
  if (!gameID) return <Redirect to="/lobby" />;
  console.log('username game comp', username);
  return (
    <div>
      <button type="submit" onClick={() => gameLeave(playerID, gameID)}>
        Leave Game
      </button>
      <h1>This is the game page</h1>
    </div>
  );
}

Game.propTypes = {
  username: PropTypes.string.isRequired,
  playerID: PropTypes.string.isRequired,
  gameID: PropTypes.string.isRequired,
  gameLeave: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    playerID: state.player.id,
    gameID: state.game.id,
  };
}

export default checkURL(
  connect(
    mapStateToProps,
    actions,
  )(Game),
);
