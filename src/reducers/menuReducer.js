import deepFreeze from 'deep-freeze';

export const initialState = {
  selected: false
}

export default function menuReducer(state = initialState, action) {
  deepFreeze(initialState);

  switch (action.type) {
    case 'TOGGLE_MENU':
      return { 
        ...state,
        selected: action.payload
      }
    default:
      return state
  }
}
