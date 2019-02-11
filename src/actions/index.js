import { SAVE_COMMENT } from 'actions/types';

// eslint-disable-next-line
export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    payload: comment,
  };
}
