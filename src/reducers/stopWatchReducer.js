import deepFreeze from 'deep-freeze';
import moment from 'moment';

export const initialState = {
  stopWatch: moment().startOf("day")
}

export default function postReducer(state = initialState, action) {
  deepFreeze(initialState);

  switch (action.type) {
    case 'RESET_STOPWATCH':
      return initialState;
    case 'UPDATE_STOPWATCH':
      return { 
        ...state,
        stopWatch: action.payload
      }
    default:
      return state
  }
}
