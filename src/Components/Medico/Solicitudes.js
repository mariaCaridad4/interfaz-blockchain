import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

import medService from '../../server/med.service';
import orgService from '../../server/org.service';


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
        width: 600,
        marginTop: theme.spacing(5),
        alignSelf: 'center'
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
    demo: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
        marginTop: theme.spacing(-2),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    titulo: {
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function SignIn() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    let [soli, setSoli] = useState([]);
    let [pac, setPac] = useState([]);
    let [atributos, setAtributos] = useState([]);

    let [paciente_Actual, setPcnAct] = useState();

    const [open, setOpen] = React.useState(false);

    const handleOpen = async (paciente, medico, estado) => {
        setPcnAct(paciente);
        if (estado === "Autorizado") {
            let respu = await medService.consumirAcceso({ medico: medico, paciente: paciente })
            console.log(respu)
            if (respu.status === 200) {
                if (respu?.data?.msg[0]) {

                    setAtributos(respu.data.msg[1]);
                    setOpen(true);
                    console.dir(respu.data.msg[1], { depth: null })
                    alert(`Se le presenta la siguiente informacion ${respu.data.msg[1]}`)
                } else {
                    alert("Su acceso ya fue consumido.")
                }
            }
        } else if (estado === "No autorizado") {
            alert("No tiene acceso a la información de este paciente porque su solicitud de acceso ha sido rechazada.");
        } else {
            alert("Su solicitud de acceso aún está pendiente");
        }
    }

    const handleClose = () => setOpen(false);

    useEffect(() => {
        setLoading(true);
        try {
            const user = JSON.parse(String(sessionStorage.getItem("user")));
            medService.obtenerNotificaciones(user.sub)
                .then(response => {
                    console.log('notificaciones', response)
                    if (response.status === 200) {
                        setSoli(response.data.msg)
                    }
                })
            orgService.obtenerTipo(1)
                .then(response => {
                    console.log('obtener tipo', response)
                    if (response.status === 200) {
                        setPac({ paciente: response.data.msg })
                    }
                })
        } catch (error) {

        }
        setLoading(false);

    }, [])

    return (
        <Container component="main">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 align="center">Historial Clínico Unificado</h1>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                        del paciente {paciente_Actual}
                    </Typography>
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <div className={classes.demo}>
                                <List>
                                    <ListItem>
                                        <ListItemText primary={'Atributo'} />
                                        <ListItemText primary={'Información'} />
                                    </ListItem>
                                </List>
                                <Divider />
                            </div>
                        </div>
                        <Card className={classes.root} align="center">
                        </Card>
                        {atributos.map((atr) => (
                            <React.Fragment key={atr}>
                                <div className={classes.details}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary={atr} />
                                                <ListItemText secondary={atr} />
                                            </ListItem>
                                        </List>
                                        <Divider />
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </Card>
                </Box>
            </Modal>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIndIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Solicitudes de Acceso</Typography>
                {loading &&
                    <div>
                        <CircularProgress size={24} className={classes.buttonProgress} />
                        <br></br>
                        <br></br>
                    </div>
                }
                <Card className={classes.root}>
                    {soli.map((solicitud) => (
                        <React.Fragment key={solicitud.paciente}>
                            <div className={classes.details}>
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={solicitud.paciente} secondary={solicitud.fecha_autorizacion} />
                                            <ListItemText secondary={solicitud.acceso ? "Autorizado" : "No autorizado"} />
                                            <ListItemSecondaryAction>
                                                {solicitud.acceso && <IconButton onClick={() => handleOpen(solicitud.paciente, solicitud.medico, solicitud.acceso ? "Autorizado" : "No autorizado")}>
                                                    <VisibilityIcon />
                                                    <Link path='/ehr'> </Link>
                                                </IconButton>}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </Card>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

