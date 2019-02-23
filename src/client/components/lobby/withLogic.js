import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as actions from 'client/actions';

import withHandlers from 'client/components/lobby/withHandlers';
import withState from 'client/components/lobby/withState';

function mapStateToProps(state) {
  return { error: state.game.error, playerID: state.player.id, games: state.lobby.games };
}

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
  withState,
  withHandlers,
);
