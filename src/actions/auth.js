import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from './types';

import AuthService from '../server/auth.service';
import jwt from 'jsonwebtoken';


export const login = async (username, password) => {
    console.log('dentro del actions',username, password)
    try {
        let response = await AuthService.login(username, password)
        var decoded = jwt.decode(response.data.token.split(' ')[1], {complete: true});
            console.log(decoded.payload);
            if (response.data.token) {
                sessionStorage.setItem("user", JSON.stringify(decoded.payload))
                sessionStorage.setItem("token",response.data.token)
            }
            console.log('despachando login success')
            return({
                type: LOGIN_SUCCESS,
                payload: { user: decoded }
            });
    } catch (error) {
        console.log('despachando error')
            console.log('res: ',error.response)
            let status = error.response.status 
            let message = ""
            if(status != 200 || status != 201){
                if(status == 401){
                    message = "El usuario o contraseña no son los correrctos"
                }else{
                    message = error.response ?  error.response.data.msg || error.response.data : String(error)

                }
            
            }
            console.log(message)
            return({
                type: LOGIN_FAIL,
                payload: message
            })
            // dispatch({
            //     type: SET_MESSAGE,
            //     payload: message
            // });
            // dispatch({
            //     type: LOGIN_FAIL,
            // });
    }

            
       
            

        
}

export const comprobarLogueo = () => {

    const user = JSON.parse(String(sessionStorage.getItem("user")));
  
      let logoneado = false
      if (user) {
        
        return user
      }else{
        return null
      }
      
}

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};