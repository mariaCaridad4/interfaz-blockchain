import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';

import orgService from '../../server/org.service';


import datos from '../datos/medicos.json';
import Tabla from '../Medico/tabla';

import Copyright from '../footer';


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
    root: {
        width: 800,
        marginTop: theme.spacing(5),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing(7),
        marginTop: theme.spacing(-2),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    table: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
}));



const person = '/public/logo192.png';
const cedula = '0106056633';


export default function SignIn() {
    const classes = useStyles();

    let [state] = useState({
        datos: datos
    });

    let [pac, setPac] = useState();

    const [mostrar1, setMostrar1] = useState(false);
    const [mostrar2, setMostrar2] = useState(false);
    const [mostrar3, setMostrar3] = useState(false);

    const handleClick = () => {
        const user = {
            id: 1,
            cedula: '0106056633',
            nombre: 'Médico 1',
            especialidad: 'Especialidad 1',
            organizacion: 'Organización 1',
            fecha: '01/05/2021',
            estado: 'pnd',
            nivelacceso: "3",
        };
        //let user = sessionStorage.getItem('user');
        let nivelacceso = "1";
        for (let i in state.datos) {
            if (state.datos[i].cedula === user.cedula) {
                nivelacceso = state.datos[i].nivelacceso;
                break;
            };
        }

        console.log(nivelacceso === "3");
        if (nivelacceso === "3") {
            console.log('se cumlpe 3');
            setMostrar3(true);
            setMostrar2(true);
            setMostrar1(true);

        } else if (nivelacceso === "2") {
            console.log('se cumlpe 2');
            setMostrar3(false);
            setMostrar2(true);
            setMostrar1(true);
        } else if (nivelacceso === "1") {
            console.log('se cumlpe 1');
            setMostrar3(false);
            setMostrar2(false);
            setMostrar1(true);
        } else {
            console.log('se cumlpe 0');
            setMostrar3(false);
            setMostrar2(false);
            setMostrar1(false);
        }
    };


    useEffect(() => {
        try {

            orgService.obtenerTipo(1)
                .then(response => {
                    if (response.status == 200) {
                        setPac({ paciente: response.data.msg })
                        //   console.log(response.data.msg)
                    }
                })
        } catch (error) {

        }
    }, [])


    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIcon />
                </Avatar>
                <Typography component="h1" variant="h5">EHR</Typography>
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <div className={classes.demo}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={person} className={classes.large} />
                                        </ListItemAvatar>
                                        <ListItemText primary={'Nombre'} secondary={cedula} />
                                    </ListItem>
                                </List>
                            </div>
                        </CardContent>
                    </div>
                </Card>
                <br></br>
                <br></br>
                <div align="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleClick}
                    >
                        Ver Información
                    </Button>
                </div>

                <Card className={classes.root}>
                    {mostrar1 && <h1 align="center">Historial Clínico Unificado</h1>}
                    {mostrar1 && <Tabla titulo={"Datos del Paciente y Motivos de la Consulta"} rows={rows} />}<br></br><br></br>
                    {mostrar2 && <Tabla titulo={"Estado actual de salud"} rows={rows1} />}<br></br><br></br>
                    {mostrar3 && <Tabla titulo={"Enfermedades Crónicas"} rows={rows2} />}<br></br><br></br>
                </Card>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}


const rows = [
    {
        name: 'Nombre',
        attribute: 'Paciente 1',
    },
    {
        name: 'Edad',
        attribute: '23',
    },
    {
        name: 'Ocupación',
        attribute: 'Ingeniero',
    },
    {
        name: 'Estado Civil',
        attribute: 'Soltero',
    },
    {
        name: 'Escolaridad',
        attribute: 'Tercer Nivel',
    },
    {
        name: 'Consumo de alcohol',
        attribute: '',
    },
    {
        name: 'Tabaco',
        attribute: '',
    },
    {
        name: 'Drogas',
        attribute: '',
    },
    {
        name: 'Actividad habitual',
        attribute: '',
    },
    {
        name: 'Ejercicio físico',
        attribute: '',
    },
];

const rows1 = [
    {
        name: 'Afección por alguna endermedad',
        attribute: '',
    },
    {
        name: 'Lesión en curso',
        attribute: '',
    },
    {
        name: 'Estado de hidrataciónd',
        attribute: '',
    },
    {
        name: 'Infecciones',
        attribute: '',
    },
    {
        name: 'Fiebre',
        attribute: 'Tercer',
    },
    {
        name: 'Heridas abiertas',
        attribute: '',
    },
    {
        name: 'Fístulas',
        attribute: '',
    },
    {
        name: 'Peso habitual, mínimo, máximo',
        attribute: '',
    },
];


const rows2 = [
    {
        name: 'Corto y largo plazo',
        attribute: 'Paciente 1',
    },
    {
        name: 'Px: cáncer, EC, EPC, EG, EH, DM, Dislipidemia, ER',
        attribute: '23',
    },
];