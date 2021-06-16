import React from 'react';
import ReactDOM from 'react-dom';
import './Components/styles/index.css'
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './store';

import App from './App';

//import Register from './Components/Register'
//import Login from './Components/Login'

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');


ReactDOM.render(
  <React.StrictMode>
  <Provider store ={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
