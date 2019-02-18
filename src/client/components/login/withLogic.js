import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as actions from 'client/actions';

import withHandlers from 'client/components/login/withHandlers';
import withState from 'client/components/login/withState';

function mapStateToProps(state) {
  return { error: state.player.error, username: state.player.username };
}

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
  withState,
  withHandlers,
);
