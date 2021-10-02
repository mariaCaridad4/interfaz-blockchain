import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch
// } from 'react-router-dom';

// import axios from 'axios';

//import Navigation from './Components/Navigation';
// import Login from './Components/Login';
// import Register from './Components/Register';
// import Content from './Components/Content';
// import Navpaciente from './Components/Navs/NavPaciente';
// import Navmedico from './Components/Navs/NavMedico';
// import Navadministrador from './Components/Navs/NavAdministrador';
// import Navorg from './Components/Navs/NavOrg';
// import Tabla from './Components/Medico/tabla';
import Routes from "./routes";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Components/styles/theme';


class App extends Component {
  state = {};
  //   componentDiMount = () => {
  //     axios.get('user').then(
  //         res => {
  //             //console.log(res);
  //             this.setState({
  //                 user: res.data
  //             })
  //         },
  //         err => {
  //             console.log(err)
  //         }
  //     )
  // }
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="app">
          {/* <Router> */}
          
          {/* <Navigation user={this.user}/> */}
          <Routes />
          



          {/* <Router id="router">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={() => <Content user={this.state.user}/>} />
          <Route path="/paciente" exact component={Navpaciente}/>
          <Route path="/medico" exact component={Navmedico}/>
          <Route path="/administrador" exact component={Navadministrador}/>
          <Route path="/organizacion" exact component={Navorg}/>
          <Route path="/tabla" exact component={Tabla}/>
        </Switch>
      </Router> */}
        </div>
      </ThemeProvider>
    );
  }

}

export default App

