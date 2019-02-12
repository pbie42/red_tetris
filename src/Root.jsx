import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'reducers';

const Root = ({ initialState = {}, children }) => (
  <Provider store={createStore(reducers, initialState)}>{children}</Provider>
);

Root.propTypes = {
  children: PropTypes.element.isRequired,
  initialState: PropTypes.objectOf(PropTypes.any),
};

Root.defaultProps = {
  initialState: {},
};

export default Root;
