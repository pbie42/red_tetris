import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import openSocket from 'socket.io-client';
import socketMiddleware from 'client/middlewares/socket';
import async from 'client/middlewares/async';
import stateValidator from 'client/middlewares/stateValidator';
import reducers from 'client/reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const socket = openSocket('http://localhost:7000');

// socket.on('connect', () => console.log('client connected'));

const enhancer = composeEnhancers(
  applyMiddleware(async, stateValidator, socketMiddleware),
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
