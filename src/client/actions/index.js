import axios from 'axios';
import * as types from 'client/actions/types';

export function saveComment(comment) {
  return {
    type: types.SAVE_COMMENT,
    payload: comment,
  };
}

export function fetchComments() {
  const response = axios.get('http://jsonplaceholder.typicode.com/comments');
  return {
    type: types.FETCH_COMMENTS,
    payload: response,
  };
}

export function changeAuth(isLoggedIn) {
  return {
    type: types.CHANGE_AUTH,
    payload: isLoggedIn,
  };
}

export function userCreate(username) {
  return {
    type: types.PLAYER_CREATE,
    payload: username,
    channel: 'player',
  };
}

export function userSet(username) {
  return {
    type: types.PLAYER_SET,
    payload: username,
  };
}
