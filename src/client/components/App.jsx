import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Game from 'client/components/game/Game';
import Lobby from 'client/components/lobby/Lobby';
import Login from 'client/components/login/Login';
import Setup from 'client/components/setup/Setup';
import * as actions from 'client/actions';

const App = () => (
  <div>
    <Switch>
      <Route key="/login" path="/" exact component={Login} />
      <Route key="/lobby" path="/lobby" exact component={Lobby} />
      <Route key="/setup" path="/setup" exact component={Setup} />
      <Route key="/:game" path="/:game" exact component={Game} />
    </Switch>
  </div>
);

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions,
)(App);
