import React from 'react';
import { connect } from 'react-redux';
import { parseUrl, verifyUrl } from 'client/components/game/utils';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as actions from 'client/actions';
import { Redirect } from 'react-router-dom';

const checkURL = (ChildComponent) => {
  console.log('in check url');

  function ComposedComponent(props) {
    console.log('in composed component');
    console.log('props', props);
    const { match, username } = props;
    const url = match.params.game;
    if (!verifyUrl(url)) {
      if (username) {
        console.log('redirecting to /lobby');
        return <Redirect from="/:game" exact to="/lobby" />;
      }
      console.log('redirecting to /');
      return <Redirect from="/:game" exact to="/" />;
    }
    const { player, room } = parseUrl(url);
    if (!username) {
      console.log('redirecting to /setup');
      return <Redirect from="/:game" exact to={{ pathname: '/setup', state: { player, room } }} />;
    }
    console.log('redirecting to /game');
    return <ChildComponent {...props} />;
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
