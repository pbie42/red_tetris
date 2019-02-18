import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const checkForUsername = (ChildComponent) => {
  function ComposedComponent(props) {
    const { username } = props;
    if (username) {
      return <Redirect to="/lobby" />;
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

export default checkForUsername;
