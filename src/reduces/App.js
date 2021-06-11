import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


import Navigation from '../Components/Navigation';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Content from '../Components/Content';
import Navpaciente from '../Components/Navs/NavPaciente';
import Navmedico from '../Components/Navs/NavMedico';
import Navadministrador from '../Components/Navs/NavAdministrador';
import Navorg from '../Components/Navs/NavOrg';

import ehr from '../Components/Medico/EHR';

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const logOutCallback = async () => {
    await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include',
    });

    setUser({});

    // navigate('/');
  }


  return (

    <div className="app">
      <Router id="router">
        <Navigation />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Content} />
          <Route path="/paciente" exact component={Navpaciente}/>
          <Route path="/medico" exact component={Navmedico}/>
          <Route path="/administrador" exact component={Navadministrador}/>
          <Route path="/organizacion" exact component={Navorg}/>
          <Route path="/ehr" exact component={ehr}/>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
