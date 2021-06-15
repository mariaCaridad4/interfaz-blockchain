//Archivo para aciones relacionados a mensajes
//(notificaciones) desde la/s API/s.
import {SET_MESSAGE, CLEAR_MESSAGE} from './types'

export const setMessage = (message)=>({
    type: SET_MESSAGE,
    payload: message
});

export const clearMessage = () =>({
    type: CLEAR_MESSAGE
})