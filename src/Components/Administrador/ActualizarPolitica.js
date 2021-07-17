import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GavelIcon from '@material-ui/icons/Gavel';
import Box from '@material-ui/core/Box';

import polservice from '../../server/pol.service';
import Copyright from '../footer';
import Tabla from './tablapolitica';

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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    root: {
        //display: 'flex',
        width: 400,
        marginTop: theme.spacing(5),
    },
}));


export default function SignUp() {
    const classes = useStyles();


    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <GavelIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Actualizar Política</Typography>
                
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Tabla/> 
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

