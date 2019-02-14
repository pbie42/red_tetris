import { combineReducers } from 'redux';
import commentsReducer from 'client/reducers/comments';
import authReducer from 'client/reducers/auth';
import userReducer from 'client/reducers/user';

export default combineReducers({
  comments: commentsReducer,
  auth: authReducer,
  user: userReducer,
});
