import {combineReducers} from 'redux';
import auth from './auth'
import message from './message'
import sideBar from './side-bar'

export default combineReducers({auth,message,sideBar});