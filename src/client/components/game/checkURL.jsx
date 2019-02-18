import React from 'react';
import { connect } from 'react-redux';
import { parseUrl, verifyUrl } from 'client/components/game/utils';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as actions from 'client/actions';
import { Redirect } from 'react-router-dom';

const checkURL = (ChildComponent) => {
  function ComposedComponent(props) {
    const {
      match, username, playerCreate, playerSet,
    } = props;
    const url = match.params.game;
    const verified = verifyUrl(url);
    if (verified) {
      const { player } = parseUrl(url);
      if (!username) {
        console.log('no username');
        playerCreate(player);
        playerSet(player);
      }
      setTimeout(() => {
        console.log('timing out');
      }, 1000);
      return <ChildComponent {...props} />;
    }
    if (!username) return <Redirect to="/" />;
    return <Redirect to="/lobby" />;
  }

  ComposedComponent.protoTypes = {
    username: PropTypes.string.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  function mapStateToProps(state) {
    return { username: state.player.username };
  }

  return connect(
    mapStateToProps,
    actions,
  )(ComposedComponent);
};

export default checkURL;
