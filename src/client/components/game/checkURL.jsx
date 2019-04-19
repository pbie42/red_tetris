import React from 'react';
import { connect } from 'react-redux';
import { parseUrl, verifyUrl } from 'client/components/game/utils';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import * as actions from 'client/actions';
import { Redirect } from 'react-router-dom';

const checkURL = (ChildComponent) => {
  function ComposedComponent(props) {
    const { match, username, difficulty } = props;
    const url = match.params.game;
    if (!verifyUrl(url)) {
      if (username) return <Redirect from="/:game" exact to="/lobby" />;
      return <Redirect from="/:game" exact to="/" />;
    }
    const { player, room } = parseUrl(url);
    if (!username) return <Redirect from="/:game" exact to={{ pathname: '/setup', state: { player, game: room, difficulty } }} />;
    return <ChildComponent {...props} />;
  }

  ComposedComponent.propTypes = {
    username: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  function mapStateToProps(state) {
    return { username: state.player.username, difficulty: state.game.difficulty };
  }

  return connect(
    mapStateToProps,
    actions,
  )(ComposedComponent);
};

export default checkURL;
