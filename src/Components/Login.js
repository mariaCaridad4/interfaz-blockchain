import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from "react-redux";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import { login } from '../actions/auth';
import { clearMessage } from "../actions/message";

const {ADMIN, ADMIN_ORGANIZACION, PACIENTE, MEDICO} = require("../constantes/constantes_roles")

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'María Caridad Cáceres - Daniel Fabricio Peralta '}
      <br></br>
      INTRATEC S.A.{' '}
      {new Date().getFullYear()}
      {'.'}
      <br></br>
      <br></br>
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  }
}));


const Login = (props) => {
  const classes = useStyles();

  const [cedula, setcedula] = useState('');
  const [password, setPassword] = useState('');

  
  let user = localStorage.getItem('user');

  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  
  const { message } = "";

  const [load, setLoad] = useState(false)
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('cambiado message')
    if (message)
      setLoad(false)
  }, [message])

 
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      cedula: cedula,
      password: password
    };
    /*axios.post('registro/login', data)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.token);   
        if(res.status === 200)
          history.push("/paciente")
        //si status === 401 cuando no tiene acceso
      })
      .catch(err => {
        console.log(err)
      })*/
    console.log(data);
    setLoad(true)
    dispatch(clearMessage());
    dispatch(login(data.cedula, data.password)).then( (_) =>{
      console.log({ isLoggedIn, message });
      console.log("ANTES CONSULTA USER");
      const user = JSON.parse(String(localStorage.getItem("user")));
  
      let logoneado = false
      if (user) {
        setIsLoggedIn(true)
        logoneado = true;  

        console.log(user);
        console.log(user.role === ADMIN);
        console.log(logoneado && user.role === ADMIN );  
        if (logoneado && user.role === PACIENTE) {
          history.push("/paciente")
          // return <Redirect to="/paciente" />
        } else if (logoneado && user.role === MEDICO) {
          // return <Redirect to="/medico" />
          history.push("/medico")
        }else if (logoneado && user.role === ADMIN ) {
            // console.log("ENTRO REDIRECT");
          history.push("/administrador")

          // return<Redirect to="/administrador" />
        } else if (logoneado && user.role === ADMIN_ORGANIZACION){
          history.push("/organizacion")
          
          // return <Redirect to="/organizacion" />
        } else {
          history.push("/")

          // return <Redirect to="/" />
        }
      }
     
      
    });
  
  };


  const handleChange = e => {
    if (e.currentTarget.name === 'cedula') {
      setcedula(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };



  return (
    <Container component="main" maxWidth="xs" >
      {load}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>

          <div className="login-input">
            <TextField
              value={cedula}
              onChange={handleChange}
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
              label="Password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
              {/* <Link className={classes.link} to='/paciente'>Sign in</Link> */}
            </Button>
          </div>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;