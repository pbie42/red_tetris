import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import * as actions from 'client/actions';
import Login from 'client/components/login/Login';
import Lobby from 'client/components/lobby/Lobby';
import CommentBox from 'client/components/comment_box/CommentBox';

const App = () => (
  <div>
    <Route path="/post" component={CommentBox} />
    <Route path="/lobby" component={Lobby} />
    <Route path="/" exact component={Login} />
  </div>
);

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions,
)(App);
