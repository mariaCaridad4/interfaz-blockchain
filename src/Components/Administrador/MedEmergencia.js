import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import usuService from '../../server/usu.service';
import medService from '../../server/med.service';


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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
        marginTop: theme.spacing(5),
    },
}));

const paciente = [
    {
        cedula: 'Cédula',
        nombre: 'Usuario',
        rolusuario: '',
    },
]


export default function SignUp() {
    const classes = useStyles();
    const current = new Date();
    const date  = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const [loading, setLoading] = React.useState(false);


    let [pac, setPac] = React.useState({
        paciente: paciente
    });
    let [emer, setEmer] = React.useState();


    let Agregar = (cedula_emr) => {
        if (!loading) {
            setLoading(true);
            if (cedula_emr !== '') {
                console.log(cedula_emr)
                try {
                    usuService.agregarMedicoConfianza(cedula_emr)
                        .then((response) => {
                            if (response.status === 201) {
                                 //PONER LISTA SIN MEDICOS DE EMERGENCIA                        
                                alert('Médico agregado correctamente a la lista.');   
                                setLoading(false);
                            } else {
                                setLoading(false);
                                console.log("here error", response)
                                alert(response.data.msg)
                            }
                        })
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };

    let onClick = (id,fecha) => {
        if (!loading) {
            setLoading(true);
            try {
                usuService.eliminarMedicoConfianza(id)
                    .then((response) => {
                        if (response.status === 201) {
                            try {
                                usuService.obtenerMedEmergencia()
                                .then( (response)=>{
                                    if(response.status === 200){
                                        setEmer(response.data.msg)
                                    }
                                })
                            } catch (error) {
                                
                            }        
                            alert("El médico ya no se encuentra en su lista de Médicos de Emergencia!");
                            setLoading(false);
                        } else {
                            setLoading(false);
                            console.log("here error", response)
                            alert(response.data.msg)
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }


    

    useEffect( () =>{
        try {
            medService.obtenerMedico()
            .then( (response)=>{
                if(response.status === 200){
                    setPac({paciente: response.data.msg})
                }
            })
            usuService.obtenerMedicosConfianza()
            .then( (response)=>{
                if(response.status === 200){
                    setEmer(response.data.msg)
                }
            })
        } catch (error) {
            
        }
    }, [])

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Médicos de Emergencia </Typography>
                
                <br></br>
                <br></br>
                <br></br>
                <Typography component="h6" variant="h6">Médicos para agregar a la lista</Typography>
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            {pac.paciente.map(({ cedula, nombre, rolusuario }) => (
                                <React.Fragment key={cedula}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary={nombre} secondary={cedula} />
                                                <ListItemSecondaryAction>
                                                    <Button
                                                        onClick={Agregar({cedula})}
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}
                                                    > Agregar
                                            </Button>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText secondary={rolusuario} />
                                            </ListItem>
                                        </List>
                                       
                                    </div>
                                </React.Fragment>
                            ))}
                        </CardContent>
                    </div>
                </Card>
                
                <br></br>
                <br></br>
                <br></br>
                <Typography component="h6" variant="h6">Médicos para eliminar de la lista</Typography>
                <Card className={classes.root} >
                    {emer.map((medico) => (
                        <React.Fragment key={medico.cedula}>
                            <div className={classes.details}>
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={medico.cedula} secondary={date} />
                                            <ListItemText primary={medico.rolusuario}/>
                                            <ListItemText primary="Nivel de acceso"/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => onClick(medico.cedula, date)}>
                                                    <DeleteIcon />
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