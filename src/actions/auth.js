import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from './types';

import AuthService from '../server/auth.service';
import jwt from 'jsonwebtoken';

export const login = (username, password) => (dispatch) => {
    console.log('dentro del actions',username, password)
    return AuthService.login(username, password)
        .then((response) => {
            var decoded = jwt.decode(response.data.token.split(' ')[1], {complete: true});
            console.log(decoded.payload);
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(decoded.payload))
                localStorage.setItem("token",response.data.token)
            }
            console.log('despachando login success')
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: decoded }
            });
        }, (error) => {
            console.log('despachando error')
            console.log('res: ',error.response)
            const message = error.response ?  error.response.data.msg || error.response.data : String(error)
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
            dispatch({
                type: LOGIN_FAIL,
            });

        })
}

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};