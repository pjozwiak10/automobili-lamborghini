import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH_SUCCESS, AUTH_ERROR, ADD_CAR } from './types';
import axios from 'axios';

export const login = (loginData) => (dispatch) => {

  axios.post('/api/auth', loginData, { withCredentials: true })
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data,
    }))
}

export const logout = () => (dispatch) => {
  axios.get('/api/auth/logout', { withCredentials: true })
    .then(res => dispatch({
      type: LOGOUT,
      payload: res.data,
    }))
    .catch(err => { throw err; })
}

export const authUser = () => (dispatch) => {
  axios.get('/api/auth', { withCredentials: true })
    .then(res => dispatch({
      type: AUTH_SUCCESS,
      payload: res.data,
    }))
    .catch(err => dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    }))
}

export const addCar = (configuredModel) => (dispatch) => {
  axios.post('/api/cars', configuredModel, { withCredentials: true })
    .then(res => dispatch({
      type: ADD_CAR,
      payload: res.data,
    }))
    .catch(err => { throw err; })
}