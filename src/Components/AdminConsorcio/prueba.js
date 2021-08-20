import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

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
        width: '100%', 
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
      },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();


    const [id, setId] = React.useState(null);
    const [name, setNA] = React.useState(null);

    const handleChange1 = (e) => {
        setId(e.target.value);
    }
    const handleChange2 = (e) => {
        setNA(e.target.value);
    }

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

      let onSubmit = (e) => {
        
        if (id !== null && name !== null) {
            
            const newUsuario = {
                id: id,
                na: name,
            }
            console.log(newUsuario);
            alert("Nivel de Acceso creado correctamente!");
        }else{
            alert("Ningún campo debe estar vacío. Verifique su información.");
        }
        //e.preventDefault();
    }

    return (
        <Container component="main" maxWidth="sm" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Crear Nivel de Acceso
                </Typography>
                <form onSubmit={onSubmit} className={classes.form} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange1}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                id="name"
                                autoFocus
                                onChange={handleChange2}
                            />
                        </Grid>
                        
                        
                    </Grid>
                    <div align="center">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleButtonClick}
                    >
                        Crear
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    
                </form>
            </div>
        <Box mt={8}>
        <Copyright />
      </Box>
        </Container>
        
    );
}