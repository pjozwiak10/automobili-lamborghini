import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH_ERROR, AUTH_SUCCESS, ADD_CAR } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  personal: null,
  cars: null,
  msg: '',
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case AUTH_SUCCESS:
      const { _id, name, email, cars } = action.payload.user;
      return {
        ...state,
        isAuthenticated: true,
        personal: { _id, name, email },
        msg: '',
        cars: cars,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        personal: null,
        msg: action.payload.msg,
        cars: null,
      }
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        personal: null,
        cars: null,
      }
    case ADD_CAR:
      return {
        ...state,
        cars: [action.payload.car, ...state.cars],
      }
    default:
      return state;
  }
}

export default user;