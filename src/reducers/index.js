import { combineReducers } from 'redux'

import matchesReducer from './matchesReducer';
import stopWatchReducer from './stopWatchReducer';
import menuReducer from './menuReducer';

const rootReducer = combineReducers({
  matches: matchesReducer,
  stopWatch: stopWatchReducer,
  selected: menuReducer
})

export default rootReducer
