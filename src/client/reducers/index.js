import { combineReducers } from 'redux';
import playerReducer from 'client/reducers/player';

export default combineReducers({
  player: playerReducer,
});
