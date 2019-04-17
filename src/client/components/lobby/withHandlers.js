import { withHandlers } from 'recompose';

const handleSubmitGame = (gameCreate, roomName, playerID, resetTextArea, event) => {
  event.preventDefault();
  if (roomName) gameCreate(roomName, playerID);
  resetTextArea();
};

const lobbyHandlers = withHandlers({
  submitGame: ({ gameCreate }) => (roomName, playerID, resetTextArea) => (event) => {
    handleSubmitGame(gameCreate, roomName, playerID, resetTextArea, event);
  },
  submitGameEnter: ({ gameCreate }) => (roomName, playerID, resetTextArea) => (event) => {
    if (event.key === 'Enter') {
      if (roomName) gameCreate(roomName, playerID);
      resetTextArea();
    }
  },
});

export default lobbyHandlers;
