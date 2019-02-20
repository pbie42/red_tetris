import { withStateHandlers } from 'recompose';

const initialState = {
  newRoomName: '',
};

const onChangeTextArea = () => event => ({
  newRoomName: event.target.value,
});

const resetTextArea = () => () => ({
  newRoomName: '',
});

const withTextFieldState = withStateHandlers(initialState, {
  onChangeTextArea,
  resetTextArea,
});

export default withTextFieldState;
