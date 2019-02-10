import React, { Component } from 'react';


class CommentBox extends Component {
  state = {
    comment: '',
  };

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ comment: '' });
  }

  render() {
    const { comment } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Add a Comment</h4>
        <textarea onChange={this.handleChange} value={comment} name="" id="" cols="30" rows="10" />
        <div>
          <button type="submit">Submit Comment</button>
        </div>
      </form>
    );
  }
}

export default CommentBox;
