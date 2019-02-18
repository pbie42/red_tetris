import { withStateHandlers } from 'recompose';

const initialState = {
  localUsername: '',
};

const onChangeTextArea = () => event => ({
  localUsername: event.target.value,
});

const resetTextArea = () => () => ({
  localUsername: '',
});

const withTextFieldState = withStateHandlers(initialState, {
  onChangeTextArea,
  resetTextArea,
});

export default withTextFieldState;
