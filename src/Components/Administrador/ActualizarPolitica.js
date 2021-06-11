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
import GavelIcon from '@material-ui/icons/Gavel';
import Box from '@material-ui/core/Box';
  
import datos from '../datos/politicas.json';

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
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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

const atributos = [
    {
        id: '',
        nombre: '',
    },
]

const politica = [
    {
        id: 'id',
        nombre: 'Descripcion',
        nivelacceso: '',
        atributo: atributos,
    },
]

export default function SignUp() {
    const classes = useStyles();

    let [state, setState] = React.useState({
        datos: datos
    });

    const [rol, setRol] = React.useState({
        rol: '',
        name: '',
    });
    const [atr, setAtr] = React.useState({
        atr: '',
        name: '',
    });

    const [atributo, setAtributo] = React.useState({
        atributos: atributos
    })

    let [pol, setPol] = React.useState({
        politica: politica
    });

    const handleChange1 = (event) => {
        const name = event.target.name;
        setRol({
            ...rol,
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

    const handleChange2 = (event) => {
        const name = event.target.name;
        setAtr({
            ...atr,
            [name]: event.target.value,
        });
        const newAtributo = {
            id: event.target.name,
            nombre: event.target.value,
        }
        setAtributo({
            atributos: [...atributo.atributos, newAtributo]
        });
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
            alert("Paciente no encontrador");
            const newPolitica = {
                id: 'id',
                nombre: 'Descripcion',
                nivelacceso: '',
            };
            setPol({
                politica: [newPolitica]
            })
        }
        e.preventDefault();
    }


    let Guardar = (e) => {
        console.log(atributo.atributos);
        alert('Todos los cambios han sido guardados correctamente.');
        const newPolitica = {
            id: 'id',
            nombre: 'Descripcion',
            nivelacceso: '',
        };
        setPol({
            politica: [newPolitica]
        });
        const newAtributo = {
            id: '',
            nombre: '',
        };
        setAtributo({
            atributos: [newAtributo]
        });
    };


    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <GavelIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Actualizar Política</Typography>
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
                                                <ListItemText primary={nombre} secondary={id} />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary={'Nivel Acceso:'} />
                                                <ListItemSecondaryAction>
                                                    <form className={classes.form} noValidate>
                                                        <Grid container>
                                                            <Grid item xs={12}>
                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                    <InputLabel htmlFor="outlined-age-native-simple">Nivel de Acceso</InputLabel>
                                                                    <Select
                                                                        native
                                                                        value={rol.rol}
                                                                        onChange={handleChange1}
                                                                        label="Nivel de Acceso"
                                                                        inputProps={{
                                                                            name: 'rol',
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
                                            <ListItem>
                                                <ListItemText primary={'Atributos:'} />
                                                <ListItemSecondaryAction>
                                                    <form className={classes.form} noValidate>
                                                        <Grid container>
                                                            <Grid item xs={12}>
                                                                <FormControl variant="outlined" className={classes.formControl}>
                                                                    <InputLabel htmlFor="outlined-age-native-simple">Atributos</InputLabel>
                                                                    <Select
                                                                        native
                                                                        value={atr.atributo}
                                                                        onChange={handleChange2}
                                                                        label="Atributos"
                                                                        inputProps={{
                                                                            name: 'atr',
                                                                            id: 'outlined-age-native-simple',
                                                                        }}
                                                                    >
                                                                        <option aria-label="None" value="" />
                                                                        <option value={10}>Atributo 1</option>
                                                                        <option value={20}>Atributo 2</option>
                                                                        <option value={30}>Atributo 3</option>
                                                                        <option value={40}>...</option>
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        
                                        {atributo.atributos.map(({ id, nombre }) => (
                                            <React.Fragment key={id}>
                                                    <p>{nombre}</p> 
                                            </React.Fragment>
                                        ))}
                                        </List>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <Button
                                            onClick={Guardar}
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

