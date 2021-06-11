import React, { useState, useContext, useEffect } from 'react';
import { Link } from  'react-router-dom';

  import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


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
  


const Login = () => {
  const classes = useStyles();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  
    const data = {
      email: email,
      pwd: password
    };

    axios.post('login', data)
      .then(res => {
        //console.log(res)
        localStorage.setItem('token', res.token);
      })
      .catch(err => {
        console.log(err)
      })
  };


  const handleChange = e => {
    if (e.currentTarget.name === 'email') {
      setEmail(e.currentTarget.value);
    } else {
      setPassword(e.currentTarget.value);
    }
  };

  return (
    <Container component="main" maxWidth="xs" >
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
              value={email}
              onChange={handleChange}
              type="text"
              label="Cédula"
              variant="outlined"
              margin="normal"
              name="email"
              required
              fullWidth
              autoComplete="email"
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
              <Link className={classes.link} to='/paciente'>Sing in</Link>
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