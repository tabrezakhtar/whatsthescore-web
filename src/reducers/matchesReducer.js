import deepFreeze from 'deep-freeze';

export const initialState = {
  completedMatches: [],
  runningScore: {
    player1: 0,
    player2: 0
  },
  startTime: null
}

export default function matchesReducer(state = initialState, action) {
  deepFreeze(initialState);

  switch (action.type) {
    case 'START_MATCH':
      return { 
        ...state,
        startTime: Date.now()
      }
    case 'ADD_MATCH':
      return { 
        ...state,
        completedMatches: [...state.completedMatches, { ...action.payload, endTime: Date.now(), startTime: state.startTime}]
      }
    case 'UPDATE_RUNNING_SCORE':
      return {
        ...state, runningScore: action.payload
      }
    case 'FINISH_MATCH':
      return {
        ...state,
        runningScore: {
          player1: 0,
          player2: 0
        },
        startTime: null
      }
    default:
      return state
  }
}
