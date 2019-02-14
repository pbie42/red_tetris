import { combineReducers } from 'redux';
import commentsReducer from 'client/reducers/comments';
import authReducer from 'client/reducers/auth';

export default combineReducers({
  comments: commentsReducer,
  auth: authReducer,
});
