import { combineReducers } from 'redux';
import playerReducer from 'client/reducers/player';
import gameReducer from 'client/reducers/game';
import lobbyReducer from 'client/reducers/lobby';

export default combineReducers({
  player: playerReducer,
  game: gameReducer,
  lobby: lobbyReducer,
});
