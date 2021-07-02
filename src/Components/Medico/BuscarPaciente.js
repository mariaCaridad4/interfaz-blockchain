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
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Box from '@material-ui/core/Box';
import { Link } from  'react-router-dom';
  
import EHR from './EHR';

import medService from '../../server/med.service';
import orgService from '../../server/org.service';

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
    
]

const solicitudes = [
   
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


    let onClick = async (id,nombre) => {
        console.log(id);
        const user = JSON.parse(String(sessionStorage.getItem("user")));

        let resu = await medService.solicitarAcceso({paciente:id, medico:user.sub})
        if(resu.data.success){
            alert("Solicitud de acceso enviada!");

        }
        // const newPaciente = {
        //     person: '/public/logo192.png',
        //     cedula: '',
        //     nombre: ''
        // };
        // setPac({
        //     paciente: [newPaciente]
        // })
        // const current = new Date();
        // const newSolicitud = {
        //     cedula: id,
        //     nombre: nombre,
        //     estado: "Pendiente",
        //     ver: false,
        //     fecha: `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`,
        // };
        // setSoli({
        //     solicitudes: [...soli.solicitudes, newSolicitud]
        // })
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

    let ehr = async ( paciente, medico, estado) => {
        console.log(estado)
        if (estado === "Autorizado"){
            let respu = await medService.consumirAcceso({medico:medico, paciente:paciente})
            if(respu.status == 200){
                if(respu.data.msg[0]){
                    alert(`Se le presenta la siguiente informacion ${respu.data.msg[1]}` )
                }else{
                    alert("Su acceso ya fue consumido")
                }
            }
            // <EHR />
        }else if (estado === "No autorizado"){
            alert("No tiene acceso a la información de este paciente porque su solicitud de acceso ha sido rechazada.");
        }else{
            alert("Su solicitud de acceso aún está pendiente");
        }
    }
    useEffect(()=>{
        try {
            const user = JSON.parse(String(sessionStorage.getItem("user")));
            console.log(user)
            medService.obtenerNotificaciones(user.sub)
            .then(response =>{
                // console.log(response)
                if(response.status == 200){
                    // console.log(response.data.msg)
                    setSoli({solicitudes: response.data.msg})
                    setState(response.data.msg)
                }
            })
            orgService.obtenerTipo(1).
            then(response =>{
              if(response.status == 200){
                  setPac({paciente:response.data.msg})
                //   console.log(response.data.msg)
              }  
            })
        } catch (error) {
            
        }
    },[])

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
                    {soli.solicitudes.map(({ paciente, medico, fecha_autorizacion, acceso}) => (
                        <React.Fragment key={paciente}>
                            <div className={classes.details}>
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={paciente} secondary={fecha_autorizacion} />
                                            <ListItemText secondary={acceso?"Autorizado":"No autorizado"} />
                                            <ListItemSecondaryAction>
                                                {acceso&&<IconButton onClick={() => ehr(paciente, medico,acceso?"Autorizado":"No autorizado")} edge="end" aria-label="delete">
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


