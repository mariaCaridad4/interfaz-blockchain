import React, { useState } from 'react';
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
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Box from '@material-ui/core/Box';
import { Link } from  'react-router-dom';
  
import EHR from './EHR';

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
        //display: 'flex',
        width: 600,
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
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
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

const datos = [
    {
        cedula: '0106056633',
        nombre: 'Paciente 1',
        fecha: '01/05/2021',
    },
    {
        cedula: '0102518784',
        nombre: 'Paciente 2',
        fecha: '02/05/2021',
    },
    {
        cedula: '0102754307',
        nombre: 'Paciente 3',
        fecha: '03/05/2021',
    },
]

const solicitudes = [
    {
        cedula: '0102518784',
        nombre: 'Paciente 2',
        estado: "Aceptado",
        ver: true,
        fecha: '02/05/2021',
    },
    {
        cedula: '0102754307',
        nombre: 'Paciente 3',
        estado: "Rechazado",
        ver: false,
        fecha: '03/05/2021',
    },
]

const paciente = [
    {
        person: '/public/logo192.png',
        cedula: '',
        nombre: '',
    },
]


export default function SignIn() {
    const classes = useStyles();
    let [state, setState] = useState({
        datos: datos
    });

    let [pac, setPac] = useState({
        paciente: paciente
    });

    let [soli, setSoli] = useState({
        solicitudes: solicitudes
    })


    let onClick = (id,nombre) => {
        alert("Solicitud de acceso enviada!");
        console.log(id);
        const newPaciente = {
            person: '/public/logo192.png',
            cedula: '',
            nombre: ''
        };
        setPac({
            paciente: [newPaciente]
        })
        const current = new Date();
        const newSolicitud = {
            cedula: id,
            nombre: nombre,
            estado: "Pendiente",
            ver: false,
            fecha: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
        };
        setSoli({
            solicitudes: [...soli.solicitudes, newSolicitud]
        })
    }

    let onSubmit = e => {
        let si = true;
        for (let i in state.datos) {
            if (e.target.value === state.datos[i].cedula) {
                const newPaciente = {
                    person: '/public/logo192.png',
                    cedula: e.target.value,
                    nombre: state.datos[i].nombre
                };
                si = false;
                setPac({
                    paciente: [newPaciente]
                })
            };
        }
        if (si && e.target.value!=='') {
            alert("Paciente no encontrador");
            const newPaciente = {
                person: '/public/logo192.png',
                cedula: '',
                nombre: ''
            };
            setPac({
                paciente: [newPaciente]
            })
        }
        e.preventDefault();
    }

    let ehr = ( estado) => {
        
        if (estado === "Aceptado"){
            <EHR />
        }else if (estado === "Rechazado"){
            alert("No tiene acceso a la información de este paciente porque su solicitud de acceso ha sido rechazada.");
        }else{
            alert("Su solicitud de acceso aún está pendiente");
        }
    }

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIndIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Buscar Paciente</Typography>
                <Card className={classes.root}>
                    <div onClick={onSubmit} className={classes.search} >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            name="buscar"
                            inputProps={{ 'aria-label': 'search' }}
                        ></InputBase>
                    </div>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            {pac.paciente.map(({ person, cedula, nombre,fecha }) => (
                                <React.Fragment key={cedula}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={person} className={classes.large} />
                                                </ListItemAvatar>
                                                <ListItemText primary={nombre} secondary={cedula} />
                                                <ListItemSecondaryAction>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}
                                                        onClick={() => onClick(cedula, nombre)}
                                                    > Solicitar Acceso
                            </Button>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    </div>
                                </React.Fragment>
                            ))}
                        </CardContent>
                    </div>
                </Card>

                <Card className={classes.root}>
                    <div className={classes.titulo}>
                        <Typography component="h1" variant="h5">Solicitudes de Acceso</Typography>
                    </div>
                    {soli.solicitudes.map(({ cedula, nombre, estado, fecha, ver}) => (
                        <React.Fragment key={cedula}>
                            <div className={classes.details}>
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={nombre} secondary={fecha} />
                                            <ListItemText secondary={estado} />
                                            <ListItemSecondaryAction>
                                                <IconButton onClick={() => ehr(cedula, nombre,estado)} edge="end" aria-label="delete">
                                                    <VisibilityIcon />
                                                    <Link path='/ehr'> </Link>
                                                </IconButton>
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

