import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Box from '@material-ui/core/Box';
 
import datos from '../datos/medicos.json';
import '../styles/index.css';
import Copyright from '../footer';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
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
    root: {
        //display: 'flex',
        width: 500,
        marginTop: theme.spacing(5),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    buttons: {
        display: 'flex',
        width: 100,
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(-7),
    },
    submit: {
        margin: theme.spacing(3, 0, 0),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing(7),
        marginTop: theme.spacing(-2),

    },
}));


export default function SignIn() {
    const classes = useStyles();
    let [state, setState] = useState({
        datos: datos
    });

    let onClick = (id,fecha) => {
        alert("El médico ya no se encuentra en su lista de Médicos de Confianza!");
        console.log(id,fecha);
        setState({datos: state.datos.filter(item => item.id !== id)});
    }
 
    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LocalHospitalIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Médicos de Confianza</Typography>

                <Card className={classes.root} >
                    
                    {state.datos.map(({ id, nombre, organizacion, fecha }) => (
                        <React.Fragment key={id}>

                            <div className={classes.details}>
                                <div className={classes.demo}>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={nombre} secondary={fecha} />
                                            <ListItemText primary={organizacion}/>
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => onClick(id, fecha)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </div>
                            </div>

                        </React.Fragment>
                    ))}
                </Card>
            </div>
            <Box mt={8}>
        <Copyright />
      </Box>
        </Container>
    );
}