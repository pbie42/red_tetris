import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import * as actions from 'client/actions';
import CommentList from 'client/components/comment_list/CommentList';
import CommentBox from 'client/components/comment_box/CommentBox';

const App = ({ auth, changeAuth }) => {
  const renderButton = () => {
    if (auth) {
      return (
        <button type="submit" onClick={() => changeAuth(false)}>
          Sign Out
        </button>
      );
    }
    return (
      <button type="submit" onClick={() => changeAuth(true)}>
        Sign In
      </button>
    );
  };

  const renderHeader = () => (
    <ul>
      <li>
        <Link className="go-home" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link to="/post">Post a Comment</Link>
      </li>
      <li>{renderButton()}</li>
    </ul>
  );

  return (
    <div>
      {renderHeader()}
      <Route path="/post" component={CommentBox} />
      <Route path="/" exact component={CommentList} />
    </div>
  );
};

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  changeAuth: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(
  mapStateToProps,
  actions,
)(App);
