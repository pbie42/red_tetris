import { withHandlers } from 'recompose';

const handleSubmitGame = (gameCreate, roomName, playerID, resetTextArea, event, difficulty) => {
  event.preventDefault();
  if (roomName) gameCreate(roomName, playerID, difficulty);
  resetTextArea();
};

const lobbyHandlers = withHandlers({
  submitGame: ({ gameCreate }) => (roomName, playerID, resetTextArea, difficulty) => (event) => {
    handleSubmitGame(gameCreate, roomName, playerID, resetTextArea, event, difficulty);
  },
  submitGameEnter:
    ({ gameCreate }) => (roomName, playerID, resetTextArea, difficulty) => (event) => {
      if (event.key === 'Enter') {
        if (roomName) gameCreate(roomName, playerID, difficulty);
        resetTextArea();
      }
    },
});

export default lobbyHandlers;
