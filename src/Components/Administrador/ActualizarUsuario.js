import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import orgService from '../../server/org.service';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
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

const paciente = [
    {
        cedula: 'Cédula',
        nombre: 'Usuario',
        rolusuario: '',
    },
]

export default function SignUp() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    let [pac, setPac] = React.useState({
        paciente: paciente
    });


    const Baja = (cedula) => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);

            if (cedula) {
                console.log()
                try {
                    orgService.eliminarUsuario(cedula)
                        .then((response) => {
                            if (response.status === 201) {
                                try {
                                    orgService.obtenerUsuario()
                                        .then((response) => {
                                            if (response.status === 200) {
                                                setPac({ paciente: response.data.msg })
                                            }
                                        })
                                } catch (error) {

                                }
                                alert('Usuario dado de baja correctamente.');
                                setLoading(false); setLoading(false);
                            } else {
                                setLoading(false);
                                console.log("here error", response)
                                alert(response.data.msg)
                            }
                        })
                } catch (error) {
                    console.log(error);
                }
            }
        }
        setLoading(true);
    };


    useEffect(() => {
        try {
            orgService.obtenerUsuario()
                .then((response) => {
                    if (response.status === 200) {
                        setPac({ paciente: response.data.msg })
                    }
                })
        } catch (error) {

        }
        return () => {
            clearTimeout(timer.current);
        };
    }, [])

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Actualizar Usuario</Typography>
                <br></br>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            {pac.paciente.map(({ cedula, nombre, rolusuario }) => (
                                <React.Fragment key={cedula}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                                <ListItemText 
                                                primary={nombre} 
                                                secondary={cedula} />
                                                <ListItemSecondaryAction>
                                                    <Button
                                                        onClick={Baja({cedula})}
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        className={classes.submit}
                                                    > Dar de Baja
                                                    </Button>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText secondary={rolusuario} />
                                            </ListItem>
                                        </List>
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