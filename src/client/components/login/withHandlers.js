import { withHandlers } from 'recompose';

const handleSubmitPlayer = (playerCreate, username, resetTextArea, event) => {
  event.preventDefault();
  console.log('yuppp');

  playerCreate(username);
  resetTextArea();
};

// const handleSubmitPlayerEnter = (playerCreate, username, resetTextArea) => {
//   console.log('yuppp');

//   playerCreate(username);
//   resetTextArea();
// };

const loginHandlers = withHandlers({
  submitPlayer: ({ playerCreate, lobbyGetGames }) => (username, resetTextArea) => (event) => {
    lobbyGetGames();
    handleSubmitPlayer(playerCreate, username, resetTextArea, event);
  },
  submitPlayerEnter: ({ playerCreate, lobbyGetGames }) => (username, resetTextArea) => (event) => {
    if (event.key === 'Enter') {
      lobbyGetGames();
      console.log('resetTextArea', resetTextArea);
      handleSubmitPlayer(playerCreate, username, resetTextArea, event);
    }
  },
});

export default loginHandlers;
