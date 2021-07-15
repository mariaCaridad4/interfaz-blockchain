import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Box from '@material-ui/core/Box';

import Copyright from '../footer';


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
        width: '70%', 
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
      },
}));

export default function SignUp() {
    const classes = useStyles();

    const [id, setId] = React.useState(null);
    const [name, setNA] = React.useState(null);

    const handleChange1 = (e) => {
        setId(e.target.value);
    }
    const handleChange2 = (e) => {
        setNA(e.target.value);
    }


    let onSubmit = (e) => {
        if (id !== null && name !== null) {
            alert("Nivel de Acceso creado correctamente!");
            const newUsuario = {
                id: id,
                na: name,
            }
            console.log(newUsuario);
        }else{
            alert("Ningún campo debe estar vacío. Verifique su información.");
        }
        e.preventDefault();
    }

    return (
        <Container component="main" maxWidth="sm" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Crear Nivel de Acceso
        </Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="id"
                                name="id"
                                variant="outlined"
                                required
                                fullWidth
                                id="id"
                                label="Id"
                                autoFocus
                                onChange={handleChange1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Nombre"
                                autoFocus
                                onChange={handleChange2}
                            />
                        </Grid>
                        
                        
                    </Grid>
                    <div align="center">
                    <Button
                        type="submit"
                        //fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Crear
          </Button>
                    </div>
                    
                </form>
            </div>
        <Box mt={8}>
        <Copyright />
      </Box>
        </Container>
        
    );
}