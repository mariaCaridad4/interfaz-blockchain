import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import axios from 'axios';

import Navigation from './Components/Navigation';
import Login from './Components/Login';
import Register from './Components/Register';
import Content from './Components/Content';
import Navpaciente from './Components/Navs/NavPaciente';
import Navmedico from './Components/Navs/NavMedico';
import Navadministrador from './Components/Navs/NavAdministrador';
import Navorg from './Components/Navs/NavOrg';

import ehr from './Components/Medico/EHR';

export default class App extends Component {
  state = {};
  componentDiMount = () => {
    axios.get('user').then(
        res => {
            //console.log(res);
            this.setState({
                user: res.data
            })
        },
        err => {
            console.log(err)
        }
    )
}
render() {
  return (
    <div className="app">
      <Router id="router">
        <Navigation user={this.state.user}/>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={() => <Content user={this.state.user}/>} />
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
  
}

