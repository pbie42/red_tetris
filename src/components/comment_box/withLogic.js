import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as actions from 'actions';

import withHandlers from 'components/comment_box/withHandlers';
import withState from 'components/comment_box/withState';

export default compose(
  connect(
    null,
    actions,
  ),
  withState,
  withHandlers,
);
