import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../actions/types";

const user = sessionStorage.getItem('user');
const initialState = user ? {isLoggedIn: true, user} : {isLoggedIn: false, user: null}

export default function (state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case LOGIN_SUCCESS: 
        return {
            ...state,
            user: payload.user,
            isLoggedIn: true
            
        };
        case LOGIN_FAIL:
            return {
                ...state, 
                isLoggedIn: false,
                user: null
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default: 
            return state;
    }
}
