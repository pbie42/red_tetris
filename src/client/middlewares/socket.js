import io from 'socket.io-client';
import * as types from 'client/actions/types';
import * as actions from 'client/actions';

const socket = io('http://localhost:7000');

socket.on('connect', () => console.log('client connected'));

socket.on('disconnect', () => console.log('disconnected from socket'));

socket.emit('user', 'testing');

// eslint-disable-next-line consistent-return
export default ({ dispatch }) => next => (action) => {
  if (!action.payload || !action.type || !action.channel) {
    return next(action);
  }

  socket.emit(action.channel, { payload: action.payload, type: action.type });

  socket.on('user', (event) => {
    switch (event.type) {
      case types.USER_SET:
        dispatch(actions.userSet(event.payload));
        break;

      default:
        break;
    }
  });

  socket.on('connect', () => {
    console.log('connected client');
  });
};
