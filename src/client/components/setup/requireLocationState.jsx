import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import * as actions from 'client/actions';

const requireLocationState = (ChildComponent) => {
  function ComposedComponent(props) {
    const { location, username } = props;
    if (!location.state) {
      if (username) return <Redirect to="/lobby" />;
      return <Redirect to="/" />;
    }
    if (!location.state.player || !location.state.game) {
      if (username) return <Redirect to="/lobby" />;
      return <Redirect to="/" />;
    }
    return <ChildComponent {...props} />;
  }

  ComposedComponent.propTypes = {
    username: PropTypes.string.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  };

  function mapStateToProps(state) {
    return {
      username: state.player.username,
      playerID: state.player.id,
      roomName: state.game.roomName,
    };
  }

  return connect(
    mapStateToProps,
    actions,
  )(ComposedComponent);
};

export default requireLocationState;
