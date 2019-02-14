import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CommentList = ({ comments }) => {
  const renderComments = () => comments.map(comment => (
    <li className="comment" key={comment}>
      {comment}
    </li>
  ));

  return (
    <div>
      <h4>Comment List</h4>
      <ul>{renderComments()}</ul>
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function mapStateToProps(state) {
  return { comments: state.comments };
}

export default connect(mapStateToProps)(CommentList);
