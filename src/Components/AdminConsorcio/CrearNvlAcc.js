import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

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
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
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


    const [id, setId] = React.useState(null);
    const [name, setNA] = React.useState(null);

    const handleChange = (e) => {
        if (e.currentTarget.name === 'id') {
            setId(e.currentTarget.value);
        } else if (e.currentTarget.name === 'name') {
            setNA(e.currentTarget.value);
        }
      
    }


    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);


    let onSubmit = (e) => {
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            console.log("newNivel");
            if (id !== null && name !== null) {
                const newNivel = {
                    nivel_acceso: id,
                }
                try {
                    orgService.crearNivelAcceso(newNivel)
                        .then((response) => {
                            console.log(response);
                            if (response.status === 200) {
                                setId("")
                                setNA("")
                                alert("Nivel de Acceso creado correctamente.");
                                setLoading(false);
                            } else {
                                setLoading(false);
                                console.log("here error", response)
                                alert(response.data.msg)
                            }
                        })
                } catch (error) {
                    console.log("no llama a la funci'on");
                }
            } else {
                alert("Ningún campo debe estar vacío. Verifique su información.");
            }
        }  
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Crear Nivel de Acceso
                </Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        value={id}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Id"
                        name="id"
                        autoComplete="id"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={name}
                        required
                        fullWidth
                        name="name"
                        label="Nombre"
                        id="name"
                        autoComplete="Nombre"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        //onClick={handleButtonClick}
                    >
                        Crear
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}