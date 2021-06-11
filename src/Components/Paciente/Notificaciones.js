import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';

import datos from '../datos/medicos.json';


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
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
        display: 'flex',
        width: 500,
        marginTop: theme.spacing(5),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    buttons: {
        display: 'flex',
        width: 100,
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(-7),
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing(7),
        marginTop: theme.spacing(-2),
    },
}));

 
export default function Notificaciones() {
    const classes = useStyles();
    let [state, setState] = useState({
        datos: datos
    });


    let onClick = (tipo, id, fecha) => {
        if (tipo) {
            alert("Solicitud para acceso del médico Aceptada!");
        } else {
            alert("Solicitud para acceso del médico Rechazada!");
        }
        console.log(id, fecha);
        if (state.datos.length === 1) {
            alert("No hay solicitudes pendientes");
        }
        setState({ datos: state.datos.filter(item => item.id !== id) });
    }



    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <NotificationsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Notificaciones</Typography>
                {state.datos.map(({ id, nombre, especialidad, organizacion, fecha }) => (
                    <React.Fragment key={id}>
                        <Card className={classes.root}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h6" variant="h6">Autorizar acceso a médico:</Typography>
                                    <div className={classes.demo}>
                                        <List >
                                            <ListItem>
                                                <ListItemText primary={nombre} secondary={especialidad} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText secondary={organizacion} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText secondary={fecha} />
                                            </ListItem>
                                        </List>
                                    </div>
                                </CardContent>
                            </div>
                            <div className={classes.buttons} >
                                <CardContent className={classes.content}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => onClick(true, id, nombre, fecha)}
                                    > Aceptar
                            </Button>
                                    <br></br>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => onClick(false, id, nombre, fecha)}
                                    > Rechazar
                            </Button>
                                </CardContent>
                            </div>
                        </Card>
                    </React.Fragment>
                ))}
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}