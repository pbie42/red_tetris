import { withHandlers } from 'recompose';

const handleSubmitPlayer = (playerCreate, username, resetTextArea, event) => {
  event.preventDefault();
  playerCreate(username);
  resetTextArea();
};

const loginHandlers = withHandlers({
  submitPlayer: ({ playerCreate }) => (username, resetTextArea) => (event) => {
    handleSubmitPlayer(playerCreate, username, resetTextArea, event);
  },
});

export default loginHandlers;
