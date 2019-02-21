import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const checkForGame = (ChildComponent) => {
  function ComposedComponent(props) {
    const { username, roomName } = props;
    if (!username) return <Redirect to="/" />;
    if (username && roomName) {
      return <Redirect to={{ pathname: `/${roomName}[${username}]` }} />;
    }
    return <ChildComponent {...props} />;
  }

  ComposedComponent.protoTypes = {
    username: PropTypes.string.isRequired,
  };

  function mapStateToProps(state) {
    return { username: state.player.username };
  }

  return connect(mapStateToProps)(ComposedComponent);
};

export default checkForGame;
