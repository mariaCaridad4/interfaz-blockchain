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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
  }

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '70%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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

    const [nombre, setNombre] = React.useState(null);
    const [cedula, setCedula] = React.useState(null);
    const [contrasena, setContrasena] = React.useState(null);
    const [rol1, setRol1] = React.useState(null);
    const [org1, setOrg1] = React.useState(null);
    const [aux, setAux] = React.useState(1);

    const handleChange = e => {
        if (aux === 1) {
            setNombre(e.target.value);
            setAux(2);
        } else if (aux === 2) {
            setCedula(e.target.value);
            setAux(3);
        } else if (aux === 3) {
            setContrasena(e.target.value);
            setAux(4);
        }
    }
    const handleChange1 = (event) => {
        const name = event.target.name;
        setRol({
            ...rol,
            [name]: event.target.value,
        });
        if (event.target.value === 20) {
            setRol1('paciente');
        } else {
            setRol1('medico');
        }
        setAux(5);
    };


    const handleChange2 = (event) => {
        const name = event.target.name;
        setOrg({
            ...org,
            [name]: event.target.value,
        });
        if (event.target.value === 10) {
            setOrg1('org 1');
        } else if (event.target.value === 20) {
            setOrg1('org 2');
        } else if (event.target.value === 30) {
            setOrg1('org 3');
        } else {
            setOrg1('org 4');
        }
        setAux(5);
    };

    let onSubmit = (e) => {
        if (nombre !== null && cedula !== null && contrasena !== null && rol1 !== null && org1 !== null) {
            alert("Usuario creado correctamente!");
            const newUsuario = {
                nombre: nombre,
                cedula: cedula,
                contrasena: contrasena,
                rol: rol1,
                org: org1,
            }
            console.log(newUsuario);
        }else{
            alert("Ningún campo debe estar vacío. Verifique su información.");
        }
        e.preventDefault();
    }

    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Crear Usuario
        </Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Nombre"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="ci"
                                label="Nro. Cédula"
                                name="ci"
                                autoComplete="ci"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="confirmpwd"
                                label="Confirmar Contraseña"
                                name="confirmpwd"
                                autoComplete="confirmpwd"
                                type="password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Rol</InputLabel>
                                <Select
                                    native
                                    value={rol.rol}
                                    name="rol"
                                    onChange={handleChange1}
                                    label="Rol"
                                    inputProps={{
                                        name: 'rol',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Médico</option>
                                    <option value={20}>Paciente</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="outlined-age-native-simple">Organización</InputLabel>
                                <Select
                                    native
                                    value={org.rol}
                                    name="org"
                                    onChange={handleChange2}
                                    label="Organización"
                                    inputProps={{
                                        name: 'organizacion',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Organización 1</option>
                                    <option value={20}>Organización 2</option>
                                    <option value={30}>Organización 3</option>
                                    <option value={40}>...</option>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Crear
          </Button>
                </form>
            </div>
            <Box mt={8}>
        <Copyright />
      </Box>
        </Container>
    );
}