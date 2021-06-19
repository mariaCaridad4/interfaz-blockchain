import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import GavelIcon from '@material-ui/icons/Gavel';
import Box from '@material-ui/core/Box';

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
        marginTop: theme.spacing(8),
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
        width: '70%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [rol, setRol] = React.useState({
        rol: '',
        name: '',
    });

    const [org, setOrg] = React.useState({
        org: '',
        name: '',
    });

    const [id, setId] = React.useState(null);
    const [na, setNA] = React.useState(null);

    const handleChange = (e) => {
        setId(e.target.value);
    }


    const handleChange1 = (event) => {
        const name = event.target.name;
        setRol({
            ...rol,
            [name]: event.target.value,
        });
        setNA(event.target.value);
    };

    let onSubmit = (e) => {
        if (id !== null && na !== null) {
            alert("Política creada correctamente!");
            const newUsuario = {
                id: id,
                na: na,
            }
            console.log(newUsuario);
        } else {
            alert("Ningún campo debe estar vacío. Verifique su información.");
        }
        e.preventDefault();
    }

    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <GavelIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Crear Política
                </Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Id"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>

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
                    <div align="center">
                        <Button
                            type="submit"
                            //fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Crear
                        </Button>
                    </div>

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}