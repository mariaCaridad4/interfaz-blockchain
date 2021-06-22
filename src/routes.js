import { ADMIN, ADMIN_ORGANIZACION, PACIENTE, MEDICO } from "./constantes/constantes_roles"

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { comprobarLogueo } from "./actions/auth"


//Landing Page

// import LandingPage from "./pages/Landing/landing.component";

// import AccountNotFound from "./pages/AccountNotFound/accountNotFound.component";
// import PageNotFound from "./pages/PageNotFound/pageNotFound.component";

import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// Componentes 
import Navigation from './Components/Navigation';
import Login from './Components/Login';
import Register from './Components/Register';
import Content from './Components/Content';
import Navpaciente from './Components/Navs/NavPaciente';
import Navmedico from './Components/Navs/NavMedico';
import Navadministrador from './Components/Navs/NavAdministrador';
import Navorg from './Components/Navs/NavOrg';
import Tabla from './Components/Medico/tabla';



class Routes extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };

    constructor(props) {
        super(props);

        this.state = {
            // allowedRoutes: [
            //     "/",
            //     "/estudiantes",
            //     "/sign-in",
            //     "/maestra",
            //     "/loginCursos",
            //     "/estudiantes/",
            //     "/sign-in/",
            //     "/maestra/",
            //     "/loginCursos/",
            // ],
            user: null
         
        };
        
    }
    

    async componentDidMount() {
        console.log("AQUIIIII COMPONENTE")
        try {
            const user = comprobarLogueo()

            //   const response = await api.get(`/login/check`);
            // console.log("HOAL COMO ESTAS");
            // console.log(response);
            // const user = response.data;
            console.log(user);
            this.setState({ user: user })
        } catch (error) {
            // console.log("HOLA 333");
            this.setUser(null);
        }
    }

    render() {
        const { match, location, history } = this.props;
        let usuario = comprobarLogueo()

        console.log("HISTORIAAAA: ");
        console.log(this.props.history);
        console.log(usuario);

        if (usuario) {
            let rol = usuario.role
            if (rol === ADMIN_ORGANIZACION) {
                return (
                    <Switch>
                        {/* <Navigation user={this.user}/> */}

                        {/* <Route path="/" exact component={LandingPage} /> */}
                        <Route path="/organizacion" exact component={Navorg}></Route>

                        {/* <Route path="/administracionAula/clases" exact>
                                <ClaseProfesor
                                    cursoId={this.props.currentUser.idCurso}
                                    nivelId={this.props.currentUser.idNivel}
                                />
                            </Route> */
                        }


                        <Redirect to="/organizacion" />
                    </Switch>
                );
            } else if (rol === ADMIN) {
                console.log("ADMIN");
                return (
                    <Switch>
                        {/* <Navigation user={this.user}/> */}

                        {/* <Route path="/" exact component={LandingPage} /> */}
                        <Route path="/administrador" exact component={Navadministrador}></Route>


                        <Redirect to="/administrador" />
                    </Switch>
                );
            } else if (rol === PACIENTE) {
                return (
                    <Switch>
                        {/* <Navigation user={this.user}/> */}
                        <Route path="/paciente" exact component={Navpaciente}></Route>

                        <Redirect to="/paciente" />
                    </Switch>
                );
            } else if (rol === MEDICO) {
                return (
                    <Switch>
                        {/* <Navigation user={this.user}/> */}
                        <Route path="/medico" exact component={Navmedico}></Route>
                        <Redirect to="/medico" />
                    </Switch>
                );
            }
        }
        
        return (
            <Switch>

                <Route path="/" exact component={() => <Content/>} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Redirect to="/" />
            </Switch>
        );
        

        
    }
}


  export default withRouter((Routes));
