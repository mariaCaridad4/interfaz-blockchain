import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import background from '../imagenes/OIP.jfif';

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
  };

const useStyles = makeStyles((theme) => ({
  root: {
    height: '45vh',
  },
  image: {
    backgroundImage: `url(${background})`, 
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginLeft: theme.spacing(30),
  },
}));

export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            <h1 align="center"> Bienvenido </h1>
            <h4 align="center">a</h4>
            <h4 align="center">Prototipo de identidad Digital para Historial Clínico Unificado Utilizando Tecnología Blockchain</h4>
          </Typography>
          <form className={classes.form} noValidate>
          <br></br>
          <br></br>
            <Button
              type="submit"
              align="center"
              variant="contained"
              color="primary"
              className={classes.submit}
              path='/'
            >
              <Link to='/login'>Iniciar</Link>
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}