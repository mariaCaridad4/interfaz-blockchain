import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GavelIcon from '@material-ui/icons/Gavel';
import Box from '@material-ui/core/Box';
import polservice from '../../server/pol.service';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const [id, setId] = React.useState(null);
    const [atributos, setAtributos] = React.useState([]);

    const handleChange = (e) => {
        setId(e.currentTarget.value);
    }


    let onSubmit2 = (e) => {
        if (!loading) {
            setLoading(true);
            if (id !== null || id !== "") {
                const newUsuario = {
                    atributo: id,
                }
                // console.log(newUsuario);
                polservice.crearAtributo(newUsuario)
                    .then((response) => {
                        console.log(response)
                        if (response.status == 201) {
                            alert("Atributo creado correctamente!");
                            setId("")
                        } else {
                            alert("Hubo un incoveniente")
                        }
                        setId("")
                        setLoading(false);
                    })
            } else {
                alert("Ningún campo debe estar vacío. Verifique su información.");
                setLoading(false);
            }
            e.preventDefault();
        }
    }

    useEffect(() => {
        try {
            polservice.obtenerAtributos()
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data.msg)
                        setAtributos(response.data.msg)
                    }
                })

        } catch (error) {

        }
    }, [])
    return (
        <>
            <Container component="main" maxWidth="xs"  >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <GavelIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Crear atributo
                    </Typography>
                    <br></br>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    <br></br>
                    <form onSubmit={onSubmit2} className={classes.form} noValidate>
                        <TextField
                            value={id}
                            name="id"
                            variant="outlined"
                            required
                            fullWidth
                            label="Id"
                            autoFocus
                            onChange={handleChange}
                        />
                        <br></br>
                        <br></br>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Crear atributo
                        </Button>

                    </form>
                   

                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>

        </>

    );
}