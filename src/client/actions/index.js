import { playerCreate, playerExists, playerSet } from 'client/actions/player/playerActions';
import {
  gameCreate, gameExists, gameReset, gameSet,
} from 'client/actions/game/gameActions';

// function changeAuth(isLoggedIn) {
//   return {
//     type: types.CHANGE_AUTH,
//     payload: isLoggedIn,
//   };
// }

export {
  playerCreate, playerExists, playerSet, gameCreate, gameExists, gameReset, gameSet,
};
