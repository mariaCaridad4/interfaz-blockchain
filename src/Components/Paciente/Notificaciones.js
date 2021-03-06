import React, { useEffect, useState } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import usuService from '../../server/usu.service';
import Copyright from '../footer';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
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
        align: 'center',
        marginLeft: 30,
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        align: 'center',
    },
}));


export default function Notificaciones() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    let [state, setState] = useState([]);


    let onClick = async (tipo, medico, paciente) => {
        if (!loading){
            setLoading(true);
            if (tipo) {
                await usuService.autorizarAcceso({ medico: medico, paciente: paciente })
                alert("Solicitud para acceso del m??dico Aceptada!");
            } else {
                await usuService.eliminarAcceso({ medico: medico, paciente: paciente })
                alert("Solicitud para acceso del m??dico Rechazada!");
            }
            // const user = JSON.parse(String(sessionStorage.getItem("user")));
            //     usuService.obtenerNotificaciones(user.sub)
            //         .then(response => {
            //             if (response.status === 200) {
            //                 setState(response.data.msg)
            //             }
            //         })
            setLoading(false);
        }
       
    }

    useEffect(() => {
        const user = JSON.parse(String(sessionStorage.getItem("user")));
        usuService.obtenerNotificaciones(user.sub)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    setState(response.data.msg)
                }
            })
    }, [])

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <NotificationsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Notificaciones</Typography>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} /> }
                
                {state.map((notificacion) => (
                    <React.Fragment key={notificacion.medico}>
                        <Card className={classes.root}>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h6" variant="h6">Autorizar acceso a m??dico:</Typography>
                                    <div className={classes.demo}>
                                        <List >
                                            <ListItem>
                                                <ListItemText primary={notificacion.medico} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText secondary={notificacion.acceso ? "Autorizado" : 'No autorizado'} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText secondary={notificacion.fecha_autorizacion} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary={'Nivel de Acceso m??nimo: '+notificacion.nivel_acceso} />
                                            </ListItem>
                                        </List>
                                    </div>
                                </CardContent>
                            </div>
                            {!notificacion.acceso && <div className={classes.buttons} >
                                <CardContent className={classes.content}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => onClick(true, notificacion.medico, notificacion.paciente)}
                                    > Aceptar
                                    </Button>
                                    <br></br>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => onClick(false, notificacion.medico, notificacion.paciente)}
                                    > Rechazar
                                    </Button>
                                </CardContent>
                            </div>}
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