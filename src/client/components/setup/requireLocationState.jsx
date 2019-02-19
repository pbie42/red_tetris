import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from 'client/actions';

const requireLocationState = (ChildComponent) => {
  function ComposedComponent(props) {
    const { location, username } = props;
    if (!location.state) {
      if (username) return <Redirect to="/lobby" />;
      return <Redirect to="/" />;
    }
    return <ChildComponent {...props} />;
  }

  ComposedComponent.protoTypes = {
    username: PropTypes.string.isRequired,
  };

  function mapStateToProps(state) {
    return { username: state.player.username };
  }

  return connect(
    mapStateToProps,
    actions,
  )(ComposedComponent);
};

export default requireLocationState;
