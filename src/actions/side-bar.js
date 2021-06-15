import {
CARD_DISPLAY_EDIT
} from './types'

//Campo es para la cedula..
//menu_opcion es para la opcion de la cual es activada la opcion editar... es decir
//vendedores, secretaria, etc.
export const edit_pressed = (campo,menu_opcion)=>(dispatch)=>{
    dispatch({
        type: CARD_DISPLAY_EDIT,
        payload: {
            campo,
            menu_opcion
        }
    })
}

