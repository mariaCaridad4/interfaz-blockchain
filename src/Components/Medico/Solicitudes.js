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
import { Link } from  'react-router-dom';
  

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
    demo: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing(7),
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

const datos = [
    
]

const solicitudes = [
    {
    cedula: 'cedula 1',
    nombre: 'nombre 1',
    estado: "Pendiente",
    ver: false,
    fecha: "",
    }
   
]



export default function SignIn() {
    const classes = useStyles();


    let [soli] = useState({
        solicitudes: solicitudes
    })


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
       /* try {
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
            
        }*/
    },[])

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIndIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Solicitudes de Acceso</Typography>

                <Card className={classes.root}>
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


