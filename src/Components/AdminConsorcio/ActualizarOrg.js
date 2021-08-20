import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

import datos from '../datos/org.json';
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    root: {
        //display: 'flex',
        width: '100%',
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
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
}));

const politica = [
    {
        id: 'id',
        nombre: 'Descripcion',
        nivelacceso: '',
    },
]

export default function SignUp() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    let [state, setState] = React.useState({
        datos: datos
    });

    const [nivelacceso, setnivelacceso] = React.useState({
        nivelacceso: '',
        name: '',
    });

    let [pol, setPol] = React.useState({
        politica: politica
    });

    const handleChange1 = (event) => {
        const name = event.target.name;
        setnivelacceso({
            ...nivelacceso,
            [name]: event.target.value,
        });
        let newPolitica;
        for (let i in state.datos) {
            newPolitica = {
                cedula: state.datos[i].cedula,
                nombre: state.datos[i].nombre,
                nivelacceso: event.target.value,
                atributo: [],
            };
            setPol({
                politica: [newPolitica]
            });
        };
        console.log(pol.politica);
    };


    let onSubmit = e => {
        let si = true;
        for (let i in state.datos) {
            if (e.target.value === state.datos[i].id) {
                const newPolitica = {
                    cedula: e.target.value,
                    nombre: state.datos[i].nombre,
                    nivelacceso: state.datos[i].nivelacceso,
                    atributo: [],
                };
                si = false;
                setPol({
                    politica: [newPolitica]
                });
            };
        }
        if (si && e.target.value !== '') {
            alert("Organización no encontrada.");
            const newPolitica = {
                id: 'id',
                nombre: 'Descripcion',
                nivelacceso: '',
            };
            setPol({
                politica: [newPolitica]
            })
        }
        //e.preventDefault();
    }


    let Guardar = (e) => {
        alert('Todos los cambios han sido guardados correctamente.');
        const newPolitica = {
            id: 'id',
            nombre: 'Descripcion',
            nivelacceso: '',
        };
        setPol({
            politica: [newPolitica]
        });
    };

    React.useEffect(() => {
        return () => {
          clearTimeout(timer.current);
        };
      }, []);
    
      const handleButtonClick = () => {
        if (!loading) {
          setSuccess(false);
          setLoading(true);
          timer.current = window.setTimeout(() => {
            setSuccess(true);
            setLoading(false);
          }, 2000);
        }
      };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ApartmentIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Actualizar Organización</Typography>
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
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Card>
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <form >

                        </form>
                        <CardContent className={classes.content}>
                            {pol.politica.map(({ id, nombre, nivelacceso }) => (
                                <React.Fragment key={id}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary={nombre}/>
                                            </ListItem>
                                            <ListItem>

                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary={'Nivel Acceso Mínimo:'} />
                                                <ListItemSecondaryAction>
                                                    <form className={classes.form} noValidate>
                                                        <Grid container>
                                                            <Grid item xs={12}>
                                                                <FormControl variant="outlined" className={classes.formContnivelacceso}>
                                                                    <InputLabel htmlFor="outlined-age-native-simple">Nivel de Acceso</InputLabel>
                                                                    <Select
                                                                        native
                                                                        fullWidth
                                                                        value={nivelacceso.nivelacceso}
                                                                        onChange={handleChange1}
                                                                        label="Nivel de Acceso"
                                                                        inputProps={{
                                                                            name: 'nivelacceso',
                                                                            id: 'outlined-age-native-simple',
                                                                        }}
                                                                    >
                                                                        <option aria-label="None" value="" />
                                                                        <option value={10}>Nivel 1</option>
                                                                        <option value={20}>Nivel 2</option>
                                                                        <option value={30}>Nivel 3</option>
                                                                        <option value={40}>...</option>
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText secondary={nivelacceso} />
                                            </ListItem>
                                        </List>
                                    <div align="center">
                                    <Button
                                            onClick={Guardar}
                                            type="submit"
                                            //fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={handleButtonClick}
                                        > Guardar
                                            </Button>
                                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </div>
                                        
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

