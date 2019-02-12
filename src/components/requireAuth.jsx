import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

function requireAuth(ChildComponent) {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway = () => {
      const { auth, history } = this.props;
      if (!auth) history.push('/');
    };

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  ComposedComponent.propTypes = {
    auth: PropTypes.bool.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  };

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(ComposedComponent);
}

export default requireAuth;
