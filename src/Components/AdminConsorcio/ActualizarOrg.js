import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import ApartmentIcon from '@material-ui/icons/Apartment';
import Box from '@material-ui/core/Box';
import Divider from '@mui/material/Divider';

import orgService from '../../server/org.service';

import Copyright from '../footer';


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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    root: {
        width: '100%',
        marginTop: theme.spacing(5),
    },
}));


export default function SignUp() {
    const classes = useStyles();
    const timer = React.useRef();


    const [orgaizaciones, setOrganizaciones] = React.useState([]);

    React.useEffect(() => {
        try {
            orgService.obtenerOrganizaciones()
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        setOrganizaciones(response.data.msg)
                    }
                })
        } catch (error) {

        }
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            clearTimeout(timer.current);
        };
    }, []);



    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ApartmentIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Ver Organización</Typography>

                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            {orgaizaciones.map(org => {
                                return (
                                    <React.Fragment key={org.id}>
                                        <div className={classes.demo}>
                                            <List >
                                                <ListItem>
                                                    <ListItemText primary={org.id +' ' +org.name} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText secondary={'Nivel Acceso Mínimo:'} />
                                                    <ListItemText secondary={org.niveles_acceso}/>
                                                </ListItem>
                                            </List>
                                            <Divider />
                                        </div>
                                    </React.Fragment>
                                )
                            })}
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

