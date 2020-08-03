import { STOP_HOME_ANIMATION } from '../actions/types'

const animation = (state = false, action) => {
  switch (action.type) {
    case STOP_HOME_ANIMATION:
      return state = action.stop;
    default:
      return state
  }
}

export default animation;