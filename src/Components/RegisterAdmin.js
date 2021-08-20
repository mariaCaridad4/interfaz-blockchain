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
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

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
        marginTop: theme.spacing(3),
        //alignItems: 'center',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(3, 0, 2),
        minWidth: '100%',
    },
    grid: {
        alignItems: 'center',
        //marginLeft: theme.spacing(25),
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



const RegisterAdmin = () => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const [org, setOrg] = useState({
        org: '',
        name: '',
    });

    const [cedula, setCedula] = useState("");


    const [orgSelect, setOrgSelect] = useState(-1);

    const [email, setEmail] = useState('');
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
        return () => {
            clearTimeout(timer.current);
          };    
    }, [])

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
        <Container component="main" maxWidth="xs">
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
                            </Select>
                        </FormControl>
                        <div align="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
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

