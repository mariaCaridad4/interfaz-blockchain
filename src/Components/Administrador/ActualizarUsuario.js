import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Card from '@material-ui/core/Card';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import orgService from '../../server/org.service';
import Box from '@material-ui/core/Box';
  
import datos from '../datos/usuarios.json';

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
        //width: '70%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    root: {
        //display: 'flex',
        width: 400,
        marginTop: theme.spacing(5),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#ECE0F8',
        [theme.breakpoints.up('sm')]: {
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

    let [habilitarLista, setHabilitarLista] = React.useState(true);
    let [habilitarBoton, setHabilitarBoton] = React.useState(true);

    let [state, setState] = React.useState({
        datos: datos
    });

    let [pac, setPac] = React.useState({
        paciente: paciente
    });

    const [rol, setRol] = React.useState({
        rol: '',
        name: '',
    });

    let Baja = (e) => {
        alert('Usuario dado de baja correctamente.');
        setHabilitarBoton(false);
    };

    let Guardar = (e) => {
        alert('Todos los cambios han sido guardados correctamente.');
        setHabilitarBoton(true);
        const newPaciente = {
            cedula: 'Cédula',
            nombre: 'Usuario',
            rolusuario: '',
        };
        setPac({
            paciente: [newPaciente]
        })
    };

    let onSubmit = e => {
        let si = true;
        for (let i in state.datos) {
            if (e.target.value === state.datos[i].cedula) {
                const newPaciente = {
                    cedula: e.target.value,
                    nombre: state.datos[i].nombre,
                    rolusuario: state.datos[i].rolusuario,
                };
                si = false;
                setPac({
                    paciente: [newPaciente]
                })
                if (state.datos[i].rolusuario === 'Médico') {
                    setHabilitarLista(false);
                } else {
                    setHabilitarLista(true);
                }
            };
        }
        if (si && e.target.value !== '') {
            alert("Paciente no encontrador");
            const newPaciente = {
                cedula: 'Cédula',
                nombre: 'Usuario',
                rolusuario: '',
            };
            setPac({
                paciente: [newPaciente]
            })
        }
        e.preventDefault();
    }
    useEffect( () =>{
        try {
            orgService.obtenerUsuario()
            .then( (response)=>{
                if(response.status === 200){
                    setPac({paciente: response.data.msg})
                }
            })
        } catch (error) {
            
        }
    }, [])

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Actualizar Usuario</Typography>
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
                        />
                    </div>
                </Card>
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
                                                        onClick={Baja}
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}
                                                    > Dar de Baja
                                            </Button>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText secondary={rolusuario} />
                                            </ListItem>
                                        </List>
                                        <Button
                                            onClick={Guardar}
                                            disabled={habilitarBoton}
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        > Guardar
                                            </Button>
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