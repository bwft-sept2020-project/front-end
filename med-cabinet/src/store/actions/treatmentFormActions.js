import axios from 'axios';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

// action types
export const ADD_TREATMENT = 'ADD_TREATMENT';
export const ADD_TREATMENT_SUCCESS = 'ADD_TREATMENT_SUCCESS';
export const ADD_TREATMENT_ERROR = 'ADD_TREATMENT_ERROR';

export const EDIT_PROFILE = 'EDIT_PROFILE'
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS'
export const EDIT_PROFILE_ERROR = 'EDIT_PROFILE_ERROR'

export const DELETE_PROFILE = 'DELETE_PROFILE'
export const DELETE_PROFILE_SUCCESS = 'DELETE_PROFILE_SUCCESS'
export const DELETE_PROFILE_ERROR = 'DELETE_PROFILE_ERROR'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'

export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR'


// url
const url = 'https://medswap.herokuapp.com/api/'
// const cors = 'https://cors-anywhere.herokuapp.com/'

// action creators

// Login
export const loginUser = (info) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER});
        axiosWithAuth()
            .post('auth/login', info) // to update
            .then(res => {
                console.log(res.config.data, "<==== SUCCESSFUL LOGIN DATA");
                localStorage.setItem('token', res.data.token)
                // window.location = "http://localhost:3000/protected"; // to change
                dispatch({
                    type: LOGIN_USER_SUCCESS, 
                    payload: res.config.data
                })
            })
            .catch(err => {
                console.log(err, "<==== ERROR ON LOGIN")
                dispatch({
                    type: LOGIN_USER_ERROR,
                    payload: {
                        message: 'Cant return'
                    }
                })
            });
    }
}

// Register
export const registerUser = (info, id) => {
    console.log(info)
    return (dispatch) => {
        dispatch({ type: REGISTER_USER })
        axiosWithAuth()
            .post(`${url}auth/register`, info)
            .then(res => {
                const id = res.data.data.id
                dispatch({ type: REGISTER_USER_SUCCESS, payload: res.data.data })
                window.location = `http://localhost:3000/profile/${res.data.data.id}`; 
            })
            .catch(err => {
                dispatch({ type: REGISTER_USER_ERROR, payload: err })
            })
    }
}

// Add Treatment Action
export const addTreatment = (info) => {
    return (dispatch) => {
        dispatch({ type: ADD_TREATMENT});
        axios
            .post(`https://potbot2020.herokuapp.com/predict`, info) 
            .then(res => {
                console.log(res, "ACTION CONSOLEEE");
                dispatch({
                    type: ADD_TREATMENT_SUCCESS, 
                    payload: res.data.all
                })
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: ADD_TREATMENT_ERROR,
                    payload: {
                        message: 'Cant return'
                    }
                })
            });
    }
}

// Edit Profile Action
export const editProfile = (user, id) => {
    console.log(user, id, "<========")
    return (dispatch) => {
        dispatch({ type: EDIT_PROFILE })
        axiosWithAuth()
            .put(`${url}auth/${id}`, user)
            .then(res => console.log(res, "ITS WORKING"))
            .catch(err => console.log(err, "its not working :("))
    }
}

// Delete Profile Action
export const deleteProfile = (user, id) => {
    return (dispatch) => {
        dispatch({ type: DELETE_PROFILE});
        axios
            .delete(`${url}auth/${id}`, user)  
            .then(res => {
                console.log(res)
                dispatch({
                    type: DELETE_PROFILE_SUCCESS,
                    payload: res.data.message
                })
            })
            .catch(err => {
                console.log(err)
                dispatch({
                    type: DELETE_PROFILE_ERROR,
                    payload: 'There was an error'
                })
            })
            .finally(() => {
                window.location = 'http://localhost:3000/'
            })
    }
}
