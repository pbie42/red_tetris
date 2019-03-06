import io from 'socket.io-client';
import * as types from 'client/actions/types';
import * as actions from 'client/actions';

const socket = io('http://localhost:7000');

socket.on('connect', () => console.log('client connected'));

socket.on('disconnect', () => console.log('disconnected from socket'));

socket.emit('player', 'testing');

let dispatchFunc = () => {};

// eslint-disable-next-line consistent-return
export default ({ dispatch }) => next => (action) => {
  dispatchFunc = dispatch;
  if (!action.payload || !action.type || !action.channel) {
    return next(action);
  }

  socket.emit(action.channel, { payload: action.payload, type: action.type });
};

socket.on('player', (event) => {
  switch (event.type) {
    case types.PLAYER_SET:
      dispatchFunc(actions.playerSet(event.payload));
      break;
    case types.PLAYER_EXISTS:
      dispatchFunc(actions.playerExists(event.payload));
      break;

    default:
      break;
  }
});

socket.on('game', (event) => {
  switch (event.type) {
    case types.GAME_SET:
      console.log('about to gameSet', event.payload);
      dispatchFunc(actions.gameSet(event.payload));
      break;
    case types.GAME_SET_ACTIVE:
      console.log('about to gameSetactive', event.payload);
      dispatchFunc(actions.gameSetActive(event.payload));
      break;
    case types.GAME_SET_NEW_LEADER:
      console.log('about to gameSetnewleader', event.payload);
      dispatchFunc(actions.gameSetNewLeader(event.payload));
      break;
    case types.GAME_PLAYERS_UPDATE:
      console.log('about to gamePlayersUpdate', event.payload);
      dispatchFunc(actions.gamePlayersUpdate(event.payload));
      break;
    case types.GAME_QUEUE_UPDATE:
      console.log('about to gameQueueUpdate', event.payload);
      dispatchFunc(actions.gameQueueUpdate(event.payload));
      break;
    case types.GAME_EXISTS:
      dispatchFunc(actions.gameExists(event.payload));
      break;
    case types.GAME_RESET:
      dispatchFunc(actions.gameReset());
      break;

    default:
      break;
  }
});

socket.on('lobby', (event) => {
  console.log('lobby channel', event);
  switch (event.type) {
    case types.LOBBY_GAMES_UPDATE:
      console.log('about to LOBBY_GAMES_UPDATE', event.payload);
      dispatchFunc(actions.lobbyGamesUpdate(event.payload));
      break;

    default:
      break;
  }
});
