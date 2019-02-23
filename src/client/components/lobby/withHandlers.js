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
});

export default lobbyHandlers;
