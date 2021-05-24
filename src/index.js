import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import NavPaciente from './NavPaciente';
import NavMedico from './NavMedico';
import NavAdministrador from './NavAdministrador';
import NavOrg from './NavOrg';
import SingIn from './SingIn';


ReactDOM.render(
  <React.StrictMode>
    <NavAdministrador />
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

/*
<NavMedico />
    <NavAdministrador />
    <NavOrg />
    <SingIn />
*/