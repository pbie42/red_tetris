import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const requireUsername = (ChildComponent, redirectURL) => {
  function ComposedComponent(props) {
    const { username } = props;
    if (!username) {
      console.log('no username bruh');

      return <Redirect to={redirectURL} />;
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

export default requireUsername;
