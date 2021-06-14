import React from 'react';
import ReactDOM from 'react-dom';
import './Components/styles/index.css'
 
import axios from 'axios';

import App from './reduces/App';  

//import Register from './Components/Register'
//import Login from './Components/Login'

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

ReactDOM.render(
  <App />,
  document.getElementById('root'));
