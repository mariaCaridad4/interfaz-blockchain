import {
    CARD_DISPLAY_EDIT
    } from './../actions/types';
    
    const initialState = {}
    
    export default function (state = initialState, action){
        const {type, payload} = action;
        switch(type){
            case CARD_DISPLAY_EDIT : 
                return {
                    ...state,
                    type,
                    payload
                }
            default:
                return state
        }
    }