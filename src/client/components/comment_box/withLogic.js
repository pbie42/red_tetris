import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as actions from 'client/actions';

import withHandlers from 'client/components/comment_box/withHandlers';
import withState from 'client/components/comment_box/withState';

export default compose(
  connect(
    null,
    actions,
  ),
  withState,
  withHandlers,
);
