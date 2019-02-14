import tv4 from 'tv4';
import stateSchema from 'client/middlewares/stateSchema';

export default ({ getState }) => next => (action) => {
  next(action);

  if (!tv4.validate(getState(), stateSchema)) console.log('Schema Error:', tv4.error);
};
