import { withHandlers } from 'recompose';

const handleSubmit = (saveComment, comment, resetTextArea, event) => {
  event.preventDefault();
  saveComment(comment);
  resetTextArea();
};

const commentBoxHandlers = withHandlers({
  onSubmit: ({ saveComment }) => (comment, resetTextArea) => (event) => {
    handleSubmit(saveComment, comment, resetTextArea, event);
  },
});

export default commentBoxHandlers;
