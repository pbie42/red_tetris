import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from 'reducers';

const Root = (props) => {
  const { children } = props;
  return <Provider store={createStore(reducers, {})}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Root;
