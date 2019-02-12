import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from 'actions';
import requireAuth from 'components/requireAuth';

class CommentBox extends Component {
  state = {
    comment: '',
  };

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = (event) => {
    const { saveComment } = this.props;
    const { comment } = this.state;
    event.preventDefault();
    saveComment(comment);
    this.setState({ comment: '' });
  };

  render() {
    const { comment } = this.state;
    const { fetchComments } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h4>Add a Comment</h4>
          <textarea
            onChange={this.handleChange}
            value={comment}
            name=""
            id=""
            cols="30"
            rows="10"
          />
          <div>
            <button type="submit">Submit Comment</button>
          </div>
        </form>
        <button className="fetch-comments" type="submit" onClick={fetchComments}>
          Fetch Comments
        </button>
      </div>
    );
  }
}

CommentBox.propTypes = {
  saveComment: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
};

export default connect(
  null,
  actions,
)(requireAuth(CommentBox));
