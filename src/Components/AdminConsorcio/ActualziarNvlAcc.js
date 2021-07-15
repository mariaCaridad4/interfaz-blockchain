import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Box from '@material-ui/core/Box';
  
import datos from '../datos/org.json';
import Copyright from '../footer';
import Tabla from './tablaniveles'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    root: {
        //display: 'flex',
        width: 600,
        marginTop: theme.spacing(5),
    },

}));

const nivel = [
    {
        id: 'id',
        nombre: 'Descripcion',
    },
]

export default function SignUp() {
    const classes = useStyles();

    let [state, setState] = React.useState({
        datos: datos
    });


    let [niv, setNivel] = React.useState({
        nivel: nivel
    });



    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Gestionar Nivel de Acceso</Typography>

                <Card className={classes.root}>
                    <div className={classes.details}>
                        <Tabla />
                        
                    </div>
                </Card>
            </div>
            <Box mt={8}>
        <Copyright />
      </Box>
        </Container>

    );
}

