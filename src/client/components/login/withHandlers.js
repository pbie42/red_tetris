import { withHandlers } from 'recompose';

const handleSubmitPlayer = (playerCreate, username, resetTextArea, event) => {
  event.preventDefault();

  playerCreate(username);
  resetTextArea();
};

const loginHandlers = withHandlers({
  submitPlayer: ({ playerCreate, lobbyGetGames }) => (username, resetTextArea) => (event) => {
    lobbyGetGames();
    handleSubmitPlayer(playerCreate, username, resetTextArea, event);
  },
  submitPlayerEnter: ({ playerCreate, lobbyGetGames }) => (username, resetTextArea) => (event) => {
    if (event.key === 'Enter') {
      lobbyGetGames();
      handleSubmitPlayer(playerCreate, username, resetTextArea, event);
    }
  },
});

export default loginHandlers;
