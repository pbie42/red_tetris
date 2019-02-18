import { withStateHandlers } from 'recompose';

const initialState = {
  username: '',
};

const onChangeTextArea = () => event => ({
  username: event.target.value,
});

const resetTextArea = () => () => ({
  username: '',
});

const withTextFieldState = withStateHandlers(initialState, {
  onChangeTextArea,
  resetTextArea,
});

export default withTextFieldState;
