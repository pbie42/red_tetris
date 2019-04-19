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
      dispatchFunc(actions.gameSet(event.payload));
      break;
    case types.GAME_MOVE_PIECE_DOWN:
      dispatchFunc(actions.gameMovePieceDown(event.payload.gameID, event.payload.playerID));
      break;
    case types.GAME_SET_ACTIVE:
      dispatchFunc(actions.gameSetActive(event.payload));
      break;
    case types.GAME_SET_NEW_LEADER:
      dispatchFunc(actions.gameSetNewLeader(event.payload));
      break;
    case types.GAME_PLAYERS_UPDATE:
      dispatchFunc(actions.gamePlayersUpdate(event.payload));
      break;
    case types.GAME_QUEUE_UPDATE:
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
  switch (event.type) {
    case types.LOBBY_GAMES_UPDATE:
      dispatchFunc(actions.lobbyGamesUpdate(event.payload));
      break;

    default:
      break;
  }
});
