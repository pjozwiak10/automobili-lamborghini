import { CONFIRM_CONFIGURATION, DELETE_CONFIGURATION } from '../actions/types';

const configurator = (state = {}, action) => {
  switch (action.type) {
    case CONFIRM_CONFIGURATION:
      return state = action.payload;
    case DELETE_CONFIGURATION:
      return state = {};
    default:
      return state;
  }
}

export default configurator;