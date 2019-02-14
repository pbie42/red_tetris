import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from 'client/actions';

const CommentList = ({ comments, userCreate }) => {
  const renderComments = () => comments.map(comment => (
    <li className="comment" key={comment}>
      {comment}
    </li>
  ));

  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          userCreate('Paul');
        }}
      >
        Test
      </button>
      <h4>Comment List</h4>
      <ul>{renderComments()}</ul>
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  userCreate: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return { comments: state.comments };
}

export default connect(
  mapStateToProps,
  actions,
)(CommentList);
