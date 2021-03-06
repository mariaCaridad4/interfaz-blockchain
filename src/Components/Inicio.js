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
import background from '../imagenes/OIP.jfif';
import { useHistory } from "react-router-dom";
import Navigation from './Navigation';


import Copyright from './footer';


const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: `url(${background})`, 
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(13.75, 4),
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
    height: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '60%'
  },
  link: {
    color: "white",
    textDecoration: "none",
},
}));

export default function SignInSide() {
  const classes = useStyles();
  let history = useHistory();


  const handleSubmit = e => {
    e.preventDefault();
    history.push("/login")
  }

  return (
    <>
    <Navigation></Navigation>
    <Grid container component="main" maxWidth="ms">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Bienvenido
          </Typography>
          <Typography component="h5" variant="h4">
            
            a
            
          </Typography>
          <br></br>
          <Typography component="h5" align="center" variant="h5">
            Subsistema de Identidad Digital para Historial Cl??nico Unificado Utilizando Tecnolog??a Blockchain
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <br></br>
          <br></br>
          <div align="center">
          <Button
              type="submit"
              align="center"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              Iniciar
            </Button>
          </div>
          
            <br></br>
            <br></br>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </>
  );
}