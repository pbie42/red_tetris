import React from 'react';
import PropTypes from 'prop-types';
import requireAuth from 'components/requireAuth';
import composeWithLogic from 'components/comment_box/withLogic';

const CommentBox = ({
  comment, onChangeTextArea, onSubmit, resetTextArea, fetchComments,
}) => (
  <div>
    <form onSubmit={onSubmit(comment, resetTextArea)}>
      <h4>Add a Comment</h4>
      <textarea onChange={onChangeTextArea} value={comment} name="" id="" cols="30" rows="10" />
      <div>
        <button type="submit">Submit Comment</button>
      </div>
    </form>
    <button className="fetch-comments" type="submit" onClick={fetchComments}>
      Fetch Comments
    </button>
  </div>
);

CommentBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  onChangeTextArea: PropTypes.func.isRequired,
  resetTextArea: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
};

export default composeWithLogic(requireAuth(CommentBox));
