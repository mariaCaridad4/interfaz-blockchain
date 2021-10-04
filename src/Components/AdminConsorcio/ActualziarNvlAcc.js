import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@material-ui/core/Card';

import Copyright from '../footer';

import polService from '../../server/pol.service';

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
    root: {
        width: '100%',
        marginTop: theme.spacing(5),
    },

}));



export default function SignUp() {
    const classes = useStyles();

    let [politicas, setPoliticas] = useState([]);

    useEffect(() => {
        try {
            polService.obtenerPoliticasTodas()
                .then(response => {
                    if (response.data.success) {
                        setPoliticas(response.data.msg);
                    } else {
                        console.log("Error al obtener las políticas", response.data.errorMsg)
                    }
                })
        } catch (error) {
            console.log("Error en la llamada a la red.", error)
        }
    }, [])

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Gestionar Nivel de Acceso</Typography>
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            {politicas.map(pol => (
                                <React.Fragment key={pol.nivel_acceso}>
                                    <div className={classes.demo}>
                                        <List >
                                            <ListItem>
                                                <ListItemText primary={'Nivel de Acceso: ' + pol.nivel_acceso} />
                                            </ListItem>
                                            <ListItem>
                                                {pol.atributos.map(atr => {
                                                    return (
                                                        <ListItemText secondary={atr} />
                                                    )
                                                })}
                                            </ListItem>
                                        </List>
                                        <Divider />
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

