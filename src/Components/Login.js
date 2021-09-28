import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Navigation from './Navigation';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import Copyright from './footer';

import { login } from '../actions/auth';
import { clearMessage } from "../actions/message";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE
} from '../actions/types';

import { GoogleLogin } from 'react-google-login';

const { ADMIN, ADMIN_ORGANIZACION, PACIENTE, MEDICO } = require("../constantes/constantes_roles")
const clientId =
  '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  footer: {
    marginTop: theme.spacing(10),
  },
  google: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


const Login = (props) => {
  const classes = useStyles();

  const [cedula, setcedula] = useState('');
  const [password, setPassword] = useState('');


  let user = sessionStorage.getItem('user');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { message } = "";

  const [load, setLoad] = useState(false)
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('cambiado message')
    if (message)
      setLoad(false)
  }, [message])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      cedula: cedula,
      password: password
    };

    if (data.cedula === "" || data.password === "") {
      alert("Ningún campo debe estar vacío. Verifique la información ingresada.")
    } else {
      console.log(data);
      setLoad(true)
      dispatch(clearMessage());
      let respuesta = await login(data.cedula, data.password)
      console.log("AQUIII para la respuesta")
      console.log(respuesta)
      // eslint-disable-next-line default-case
      switch (respuesta.type) {
        case LOGIN_FAIL:
          setIsLoggedIn(false)
          alert(respuesta.payload)
          break;
        case LOGIN_SUCCESS:
          setIsLoggedIn(true)
          const user = JSON.parse(String(sessionStorage.getItem("user")));

          let logoneado = false
          if (user) {
            setIsLoggedIn(true)
            logoneado = true;

            console.log(user);
            console.log(user.role === ADMIN);
            console.log(logoneado && user.role === ADMIN);
            if (logoneado && user.role === PACIENTE) {
              history.push("/paciente")
            } else if (logoneado && user.role === MEDICO) {
              history.push("/medico")
            } else if (logoneado && user.role === ADMIN) {
              history.push("/administrador")
            } else if (logoneado && user.role === ADMIN_ORGANIZACION) {
              history.push("/organizacion")
            } else {
              history.push("/")
            }
          }


          break;
      }


    }

    // console.log({ isLoggedIn, message });
    // console.log("ANTES CONSULTA USER");

  };

  const handleChange = e => {
    if (e.currentTarget.name === 'cedula') {
      setcedula(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Bienvenido ${res.profileObj.name}.`
    );
    //refreshTokenSetup(res);
    setIsLoggedIn(true)
    const user = JSON.parse(String(sessionStorage.getItem("user")));

    let logoneado = false
    if (user) {
      setIsLoggedIn(true)
      logoneado = true;

      console.log(user);
      console.log(user.role === ADMIN);
      console.log(logoneado && user.role === ADMIN);
      if (logoneado && user.role === PACIENTE) {
        history.push("/paciente")
      } else if (logoneado && user.role === MEDICO) {
        history.push("/medico")
      } else if (logoneado && user.role === ADMIN) {
        history.push("/administrador")
      } else if (logoneado && user.role === ADMIN_ORGANIZACION) {
        history.push("/organizacion")
      } else {
        history.push("/")
      }
    }
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert('El usuario o contraseña no son los correrctos.')
  };


  return (
    <>
      <Navigation />
      <Container component="main" maxWidth="xs" >
        {load}

        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <div className="login-input">
              <TextField
                value={cedula}
                onChange={handleChange}
                //type="number"
                type="text"
                label="Cédula"
                variant="outlined"
                margin="normal"
                name="cedula"
                required
                fullWidth
                autoComplete="cedula"
                autoFocus
              />
              <TextField
                value={password}
                onChange={handleChange}
                type="password"
                label="Contraseña"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoComplete="current-password"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
              >
                Ingresar
              </Button>

            </div>
          </form>
        </div>

        <div className={classes.google}>
          <Typography component="h7" variant="h7">
            O
          </Typography>
          <Typography component="h7" variant="h7">
            Inicie Sesión con:
          </Typography>
        </div>

        <div className={classes.google}>
          <GoogleLogin
            clientId={clientId}
            buttonText="Gmail"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={true}
          />
        </div>
        <Box mt={8} className={classes.paper}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

export default Login;