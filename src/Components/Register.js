import React, { useState } from 'react';
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
import { navigate } from '@reach/router';


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
        alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        alignItems: 'center',
        marginLeft: theme.spacing(47),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        alignItems: 'center',
    },
    grid: {
        alignItems: 'center',
        marginLeft: theme.spacing(25),
    }
}));


const Register = () => {
    const classes = useStyles();
    const [rol, setRol] = useState({
        rol: '',
        name: '',
    });

    const [org, setOrg] = useState({
        org: '',
        name: '',
    });

    const [nombre, setNombre] = useState(null);
    const [rol1, setRol1] = useState(null);
    const [org1, setOrg1] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if (nombre !== null && email !== null && password !== null && rol1 !== null && org1 !== null) {
            alert("Usuario creado correctamente!");
            const newUsuario = {
                nombre: nombre,
                cedula: email,
                contrasena: password,
                rol: rol1,
                org: org1,
            }
            console.log(newUsuario);
        } else {
            alert("Ningún campo debe estar vacío. Verifique su información.");
        }
        
        const result = await (await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })).json();

        if (!result.error) {
            console.log(result.message);
            navigate('/');
        } else {
            console.log(result.error);
        }
        
    };

    const handleChange = e => {
        if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        } else if (e.currentTarget.name === 'password'){
            setPassword(e.currentTarget.value);
        } else if (e.currentTarget.name === 'firstName'){
            setNombre(e.currentTarget.value);
        } 
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
    };


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
    };


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
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid item xs={12} sm={6} className={classes.grid} >
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            label="Nombre"
                            autoFocus
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.grid}>
                        <TextField
                            value={email}
                            onChange={handleChange}
                            type="text"
                            label="Cédula"
                            variant="outlined"
                            margin="normal"
                            name="email"
                            required
                            fullWidth
                            autoComplete="email"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.grid} >
                        <TextField
                            value={password}
                            onChange={handleChange}
                            type="password"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.grid}>
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
                    <Grid item xs={12} className={classes.grid}>
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
                    <Button
                        type="submit"
                        //fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Crear
                    </Button>
                </form>
            </div >
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container >

    );
};

export default Register;