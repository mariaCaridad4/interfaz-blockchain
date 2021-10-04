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
import Card from '@material-ui/core/Card';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PACIENTE } from '../../constantes/constantes_roles';

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
        width: 650,
        marginTop: theme.spacing(5),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    buttons: {
        display: 'flex',
        //width: '100%',
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing(7),
        marginTop: theme.spacing(-2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#ECE0F8',
        marginLeft: 0,
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        width: '60%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const paciente = [
    {
        person: '/public/logo192.png',
        cedula: '',
        nombre: '',
    },
]

const politica = [
    {
        id: 'id',
        nombre: 'Descripcion',
        nivelacceso: '',
    },
]


export default function SignIn() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);


    let [pac, setPac] = useState({
        paciente: paciente
    });

    let [soli, setSoli] = useState({
        solicitudes: []
    })




    let onClick = async (id) => {
        if (!loading) {
            setLoading(true);
            const user = JSON.parse(String(sessionStorage.getItem("user")));
            let resu = await medService.solicitarAcceso({ paciente: id, medico: user.sub })
            if (resu.data.success) {
                alert("Solicitud de acceso enviada!");
                cargarDatos();
                setLoading(false);
            } else {
                alert(resu.data.errorMsg);
                console.dir(resu.data, { depth: null })
            }
        }
        setLoading(false);
    }

    let cargarDatos = () => {
        try {
            const user = JSON.parse(String(sessionStorage.getItem("user")));
            console.log(user)
            medService.obtenerNotificaciones(user.sub)
                .then(response => {
                    if (response.status === 200) {
                        if (response.data.success) {
                            setSoli({ solicitudes: response.data.msg })
                            let solicitudesAux = response.data.msg
                            console.log('solicitudes aux', solicitudesAux)

                            orgService.obtenerTipo(PACIENTE)
                                .then(response => {
                                    console.log('Pacientes', response)
                                    if (response.status === 200) {
                                        if (response.data.success) {
                                            let otroAux = response.data.msg
                                            otroAux = otroAux.filter(item => !solicitudesAux.includes(item.cedula))
                                            setPac({ paciente: otroAux })
                                        }
                                        setPac({ paciente: response.data.msg })
                                    }
                                })
                        }

                    }
                })
        } catch (error) {

        }
    }


    useEffect(() => {
        cargarDatos();
    }, [])

    return (
        <Container component="main" maxWidth="ms">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIndIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Buscar Paciente</Typography>
                <br></br>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            {pac.paciente.map(({ cedula, correo }) => (
                                <React.Fragment key={cedula}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src='/public/logo192.png' className={classes.large} />
                                                </ListItemAvatar>
                                                <ListItemText primary={cedula} secondary={correo} />
                                                <ListItemText></ListItemText>
                                                <div>
                                                    <ListItemText className={classes.buttons} >
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            className={classes.submit}
                                                            onClick={() => onClick(cedula)}
                                                        > Solicitar Acceso
                                                        </Button>
                                                    </ListItemText>
                                                </div>

                                            </ListItem>

                                            <br></br>
                                        </List>
                                    </div>
                                </React.Fragment>
                            ))}
                        </CardContent>
                    </div>
                </Card>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}


