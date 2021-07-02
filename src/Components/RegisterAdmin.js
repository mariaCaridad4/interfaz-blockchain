import React, { useEffect, useState } from 'react';
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
import orgService from '../server/org.service';
import { ADMIN } from '../constantes/constantes_roles';

import Copyright from './footer';

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        //alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        //alignItems: 'center',
        //marginLeft: theme.spacing(47),
    },
    formControl: {
        margin: theme.spacing(1),
        //minWidth: 220,
        alignItems: 'center',
    },
    grid: {
        alignItems: 'center',
        //marginLeft: theme.spacing(25),
    },
    link: {
        color: "white",
        textDecoration: "none",
    },
}));



const RegisterAdmin = () => {
    const classes = useStyles();
    const [rol, setRol] = useState({
        rol: '',
        name: '',
    });

    const [org, setOrg] = useState({
        org: '',
        name: '',
    });

    const [cedula, setCedula] = useState("");


    const [orgSelect, setOrgSelect] = useState(-1);

    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [orgaizaciones, setOrganizaciones] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (cedula !== "" && email !== ""      && orgSelect !== -1) {
         
            const newUsuario = {
                cedula: cedula,
                correo: email,
                id_tipo: ADMIN,
                organizacion: orgSelect
            }
            console.log(newUsuario);
            try {
                orgService.crearAdmin(newUsuario)
                .then( (response)=>{
                    
                    if(response.status === 201){
                        setCedula("")
                        setEmail("")
                        setOrgSelect(-1)
                        alert("Administrador creado correctamente!");
                        
                        // setOrganizaciones(response.data.msg)
                    }else{

                        alert(response.data.msg)
                    }
                })
            } catch (error) {
                
                    // console.log(result.message);
                    // navigate('/');
                // } else {
                    console.log(error);
                // }
            }
        } else {
            alert("Ningún campo debe estar vacío. Verifique su información.");
        }
     

        // const result = await (await fetch('http://localhost:4000/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password,
        //     }),
        // })).json();

       

    };

    const handleChange = e => {
        if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        }else if (e.currentTarget.name === 'firstName') {
            setCedula(e.currentTarget.value);
        }
    };

    const handleChange2 = (event) => {
        const name = event.target.name;
        setOrgSelect(event.target.value)
        // console.log(event.target.value)
        // setOrg({
        //     ...org,
        //     [name]: event.target.value,
        // });
        // if (event.target.value === 10) {
        //     setOrg1('org 1');
        // } else if (event.target.value === 20) {
        //     setOrg1('org 2');
        // } else if (event.target.value === 30) {
        //     setOrg1('org 3');
        // } else {
        //     setOrg1('org 4');
        // }
    };


    // const handleChange1 = (event) => {
    //     const name = event.target.name;
    //     setRol({
    //         ...rol,
    //         [name]: event.target.value,
    //     });
    //     if (event.target.value === 20) {
    //         setRol1('paciente');
    //     } else {
    //         setRol1('medico');
    //     }
    // };
    
    useEffect( () =>{
        console.log('AQUIII USE EFECT adflaf')
        try {
            orgService.obtenerOrganizaciones()
            .then( (response)=>{
                if(response.status === 200){
                    setOrganizaciones(response.data.msg)
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
                <Typography component="h1" variant="h5">
                    Crear Administrador
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <div className="login-input">
                        <TextField
                            value={cedula}
                            autoComplete="firstName"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            label="Cedula"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            value={email}
                            onChange={handleChange}
                            type="text"
                            label="Correo"
                            variant="outlined"
                            margin="normal"
                            name="email"
                            required
                            fullWidth
                            autoComplete="email"
                            autoFocus
                        />
                        {/* <TextField
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
                        /> */}
                        {/* <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Rol</InputLabel>
                            <Select
                                native
                                value={rol.rol}
                                name="rol"
                                onChange={handleChange1}
                                label="Rol"
                                inputProps={{
                                    name: 'rol',
                                    id: 'rol',
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Médico</option>
                                <option value={20}>Paciente</option>
                            </Select>
                        </FormControl> */}
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Organización</InputLabel>
                            <Select
                                native
                                
                                name="org"
                                onChange={handleChange2}
                                label="Organización"
                                inputProps={{
                                    name: 'organizacion',
                                    id: 'org',
                                }}
                            >
                                <option aria-label="None" value="-1" />
                                {orgaizaciones.map( org =>{
                                    return(
                                        <option value={org.id}>{org.name}</option>

                                    )
                                })}
                                
                                {/* <option value={20}>Organización 2</option>
                                <option value={30}>Organización 3</option>
                                <option value={40}>...</option> */}
                            </Select>
                        </FormControl>
                        <div align="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Crear
                            </Button>
                        </div>


                    </div>
                </form>

            </div >
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container >

    );
};

export default RegisterAdmin;

