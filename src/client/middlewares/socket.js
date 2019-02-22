import io from 'socket.io-client';
import * as types from 'client/actions/types';
import * as actions from 'client/actions';

const socket = io('http://localhost:7000');

socket.on('connect', () => console.log('client connected'));

socket.on('disconnect', () => console.log('disconnected from socket'));

socket.emit('player', 'testing');

// eslint-disable-next-line consistent-return
export default ({ dispatch }) => next => (action) => {
  if (!action.payload || !action.type || !action.channel) {
    return next(action);
  }

  socket.emit(action.channel, { payload: action.payload, type: action.type });

  socket.on('player', (event) => {
    switch (event.type) {
      case types.PLAYER_SET:
        dispatch(actions.playerSet(event.payload));
        break;
      case types.PLAYER_EXISTS:
        dispatch(actions.playerExists(event.payload));
        break;

      default:
        break;
    }
  });

  socket.on('game', (event) => {
    switch (event.type) {
      case types.GAME_SET:
        console.log('about to gameSet', event.payload);
        dispatch(actions.gameSet(event.payload));
        break;
      case types.GAME_PLAYERS_UPDATE:
        console.log('about to gamePlayersUpdate', event.payload);
        dispatch(actions.gamePlayersUpdate(event.payload));
        break;
      case types.GAME_QUEUE_UPDATE:
        console.log('about to gameQueueUpdate', event.payload);
        dispatch(actions.gameQueueUpdate(event.payload));
        break;
      case types.GAME_EXISTS:
        dispatch(actions.gameExists(event.payload));
        break;

      default:
        break;
    }
  });
};
