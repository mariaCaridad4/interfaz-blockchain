import React, { useEffect } from 'react';
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
import GavelIcon from '@material-ui/icons/Gavel';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import polservice from '../../server/pol.service';
import orgservice from '../../server/org.service';

import { green } from '@material-ui/core/colors';

import Copyright from '../footer';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
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

export default function SignUp() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef();

    const [rol, setRol] = React.useState({
        rol: '',
        name: '',
    });
    const [rol2, setRol2] = React.useState({
        rol: '',
        name: '',
    });

    const [atributos, setAtributos] = React.useState([]);
    const [atributo, setAtributo] = React.useState(null);
    const [na, setNA] = React.useState([]);
    const [nivel_acceso, setNivelAcceso] = React.useState(null);


    const handleChange1 = (event) => {
        const name = event.target.name;
        console.log(event.target.name, event.target.value)
        setRol({
            ...rol,
            [name]: event.target.value,
        });
        setNivelAcceso(event.target.value);
    };

    const handleChange2 = (event) => {
        const name = event.target.name;
        setRol2({
            ...rol,
            [name]: event.target.value,
        });
        setAtributo(event.target.value)
    };


    const handleButtonClick = () => {
        setLoading(true);
        console.log(loading);

        if (atributo !== null && nivel_acceso !== null) {
            const newUsuario = {
                nivel_acceso: nivel_acceso,
                atributo: atributo,
            }
            console.log(newUsuario);
            polservice.crearPolitica(newUsuario)
                .then((response) => {
                    console.log(response)
                    if (response.status === 201) {
                        if (response.data.msg) {
                            alert("Pol??tica creada correctamente!");
                            setAtributo(null)
                            setNivelAcceso(null)
                            setRol2({
                                ...rol,
                                'rol': '',
                            });
                            setRol({
                                ...rol,
                                'rol': '',
                            });
                        } else {
                            alert("Error al crear la pol??tica, intente nuevamente.")
                        }
                    } else {
                        alert("Hubo un incoveniente")
                    }
                })
        } else {
            alert("Ning??n campo debe estar vac??o. Verifique su informaci??n.");
        }
    }


    useEffect(() => {
        try {
            polservice.obtenerAtributos()
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data.msg)
                        setAtributos(response.data.msg)
                    }
                })
            orgservice.obtenerNivelAcceso()
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data.msg)
                        setNA(response.data.msg)
                    }
                })

        } catch (error) {

        }
        return () => {
            clearTimeout(timer.current);
        };
    }, [])
    return (
        <>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper} align="center">
                    <Avatar className={classes.avatar}>
                        <GavelIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Crear Pol??tica
                    </Typography>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    <Grid container spacing={2}>
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
                                    {na.map((atrcosaibuto) => {
                                        return (
                                            <option value={atrcosaibuto}>{atrcosaibuto}</option>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Atributo</InputLabel>
                                <Select
                                    native
                                    value={rol2.rol}
                                    onChange={handleChange2}
                                    label="Atributo"
                                    inputProps={{
                                        name: 'rol',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />

                                    {atributos.map((atrcosaibuto) => {
                                        return (
                                            <option value={atrcosaibuto}>{atrcosaibuto}</option>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleButtonClick}
                    >
                        Crear politica
                    </Button>
                </div>

                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>

        </>

    );
}