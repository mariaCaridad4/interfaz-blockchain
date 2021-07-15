import React, { useEffect } from 'react';
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
import { convertToObject } from 'typescript';
import polservice from '../../server/pol.service';

import Copyright from '../footer';

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
    const [rol2, setRol2] = React.useState({
        rol: '',
        name: '',
    });

    const [org, setOrg] = React.useState({
        org: '',
        name: '',
    });

    const [id, setId] = React.useState(null);
    const [atributos, setAtributos] = React.useState([]);
    const [atributo, setAtributo] = React.useState(null);
    const [na, setNA] = React.useState(null);

    const handleChange = (e) => {
        setId(e.target.value);
    }


    const handleChange1 = (event) => {
        const name = event.target.name;
        console.log(event.target.value)
        setRol({
            ...rol,
            [name]: event.target.value,
        });
        setNA(event.target.value);
    };

    const handleChange2 = (event) => {
        const name = event.target.name;
        // console.log(event.target.value)
        setRol2({
            ...rol,
            [name]: event.target.value,
        });
        setAtributo(event.target.value)
    };
    let onSubmit = (e) => {
        if (atributo !== null && na !== null) {
            const newUsuario = {
                nivel_acceso: na,
                atributo: atributo,
                
            }
            console.log(newUsuario);
            polservice.crearPolitica(newUsuario) 
            .then( (response)=>{
                console.log(response)
                if(response.status == 201){
                    alert("Política creada correctamente!");
                    setAtributo(null)
                    setNA(null)
                }else{
                    alert("Hubo un incoveniente")
                }
                
            })
        } else {
            alert("Ningún campo debe estar vacío. Verifique su información.");
        }
        e.preventDefault();
    }

    
    let onSubmit2 = (e) => {
        if (id !== null ||id !== "" ) {
            const newUsuario = {
                atributo: id,                
            }
            // console.log(newUsuario);
            polservice.crearAtributo(newUsuario) 
            .then( (response)=>{
                console.log(response)
                if(response.status == 201){
                    alert("Atributo creado correctamente!");
                    setId("")
                }else{
                    alert("Hubo un incoveniente")
                }
                
            })
        } else {
            alert("Ningún campo debe estar vacío. Verifique su información.");
        }
        e.preventDefault();
    }
    useEffect( () =>{
        try {
            polservice.obtenerAtributos()
            .then( (response)=>{
                if(response.status === 200){
                    console.log(response.data.msg)
                    setAtributos(response.data.msg)
                }
            })
            
        } catch (error) {
            
        }
    }, [])
    return (
        <>
        <Container component="main" maxWidth="sm"  >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <GavelIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Crear atributo
                </Typography>
                <form onSubmit={onSubmit2} className={classes.form} noValidate>
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

                        

                    </Grid>
                    <div align="center">
                        <Button
                            type="submit"
                            //fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Crear atributo
                        </Button>
                    </div>

                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>

        </>

    );
}