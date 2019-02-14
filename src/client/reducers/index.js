import { combineReducers } from 'redux';
import commentsReducer from 'client/reducers/comments';
import authReducer from 'client/reducers/auth';
import playerReducer from 'client/reducers/player';

export default combineReducers({
  comments: commentsReducer,
  auth: authReducer,
  player: playerReducer,
});
