import { combineReducers } from 'redux';
import animation from './animation';
import configurator from './configurator';
import user from './user';

const rootReducer = combineReducers({
  animation,
  configurator,
  user,
})

export default rootReducer;