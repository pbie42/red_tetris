import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducers from 'reducers';

const Root = ({ initialState = {}, children }) => {
  const store = createStore(reducers, initialState, applyMiddleware(reduxPromise));
  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.element.isRequired,
  initialState: PropTypes.objectOf(PropTypes.any),
};

Root.defaultProps = {
  initialState: {},
};

export default Root;
