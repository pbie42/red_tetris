import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import socketMiddleware from 'client/middlewares/socket';
import async from 'client/middlewares/async';
// import stateValidator from 'client/middlewares/stateValidator';
import reducers from 'client/reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(async, socketMiddleware),
  // other store enhancers if any
);

const Root = ({ initialState = {}, children }) => {
  const store = createStore(reducers, initialState, enhancer);
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
