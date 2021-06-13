import React from 'react';
import ReactDOM from 'react-dom';
import './Components/styles/index.css'
 
import axios from 'axios';

import App from './reduces/App';  

//import Register from './Components/Register'
//import Login from './Components/Login'

axios.defaults.baseURL = 'https:localhost:4000/';
axios.defaults.headers.common['Authorization'] = 'Barear ' + localStorage.getItem('token');

ReactDOM.render(
  <App />,
  document.getElementById('root'));
