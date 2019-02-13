import { withStateHandlers } from 'recompose';

const initialState = {
  comment: '',
};

const onChangeTextArea = () => event => ({
  comment: event.target.value,
});

const resetTextArea = () => () => ({
  comment: '',
});

const withTextFieldState = withStateHandlers(initialState, {
  onChangeTextArea,
  resetTextArea,
});

export default withTextFieldState;
