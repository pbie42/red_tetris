import { combineReducers } from 'redux';
import playerReducer from 'client/reducers/player';
import gameReducer from 'client/reducers/game';

export default combineReducers({
  player: playerReducer,
  game: gameReducer,
});
