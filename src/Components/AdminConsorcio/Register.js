import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Box from '@material-ui/core/Box';
import orgService from '../../server/org.service';
import { MEDICO, PACIENTE, ADMIN } from '../../constantes/constantes_roles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Copyright from '../footer';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
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
        marginTop: theme.spacing(-1),
    },
    submit: {
        margin: theme.spacing(3, 0, 1),
    },
    formControl: {
        margin: theme.spacing(3, 0, 1),
        minWidth: '100%',
        //alignItems: 'center',
    },
}));



const Register = () => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const timer = React.useRef();
    const [rol, setRol] = useState({
        rol: '',
        name: '',
    });

    const [org, setOrg] = useState(-1);

    const [cedula, setCedula] = useState("");
    const [rol1, setRol1] = useState(-1);
    const [org1, setOrg1] = useState("");

    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [orgaizaciones, setOrganizaciones] = useState([]);
    const [orgSelect, setOrgSelect] = useState(-1);

    const handleChange = e => {
        if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        } else if (e.currentTarget.name === 'cedula') {
            setCedula(e.currentTarget.value);
        }
    };


    const handleChange1 = (event) => {
        const name = event.target.name;
        setRol({
            ...rol,
            [name]: event.target.value,
        });
        console.log(event.target.value)
        if (event.target.value == 20) {
            setRol1(PACIENTE);
        } else if (event.target.value == 10) {
            setRol1(MEDICO);
        } else if (event.target.value == 30){
            setRol1(ADMIN);

        }
        console.log(rol1)
    };

    const handleChange2 = (event) => {
        const name = event.target.name;
        setOrgSelect(event.target.value)
    };

    const handleButtonClick = () => {
        if (!loading) {
            setLoading(true);
            if (cedula !== "" && email !== "" && rol1 !== -1) {
                const newUsuario = {
                    cedula: cedula,
                    correo: email,
                    id_tipo: rol1,
                    organizacion: orgSelect,
                }
                console.log(newUsuario);
                try {
                    orgService.crearAdmin(newUsuario)
                        .then((response) => {
                            if (response.status === 201) {
                                setCedula("")
                                setEmail("")
                                setRol1(-1)
                                setOrgSelect(-1)
                                setRol({
                                    rol: '',
                                    name: '',
                                });
                                // setOrg1(-1)
                                alert("Usuario creado correctamente, se ha enviado un correo con las credenciales!");
                                setLoading(false);
                                // setOrganizaciones(response.data.msg)
                            } else {
                                setLoading(false);
                                console.log("here error", response)
                                alert(response.data.msg)
                            }
                        })
                } catch (error) {
                    console.log(error);
                }

            } else {
                if (org === -1) {
                    alert("No se encuentra logueado en el sistema");
                } else {
                    alert(rol1)
                    alert("Ningún campo debe estar vacío. Verifique su información.");

                }
            }

        }
    };

    useEffect(() => {
        const user = JSON.parse(String(sessionStorage.getItem("user")));
        orgService.obtenerUnaOrg(user.org).then((response) => {
            if (response.data.success) {
                setOrg1(response.data.msg.name)
                setOrg(response.data.msg.id)
            }
        })
        // console.log(user.org)
        setOrg1(user.org)
        try {
            orgService.obtenerOrganizaciones()
                .then((response) => {
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
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Crear Usuario
                </Typography>
                <Typography component="h1" variant="h5">
                    de Organizacion: {org1}
                </Typography>
                <br></br>
                <form className={classes.form} noValidate>
                    <div className="login-input">
                        <TextField
                            value={cedula}
                            onChange={handleChange}
                            type="number"
                            label="Cédula"
                            variant="outlined"
                            margin="normal"
                            name="cedula"
                            required
                            fullWidth
                            autoComplete="cedula"
                            autoFocus
                        />
                        <TextField
                            value={email}
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            label="Correo"
                            autoFocus
                            onChange={handleChange}
                        />
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Rol</InputLabel>
                            <Select
                                native
                                fullWidth
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
                                <option value={30}>Administrador</option>
                            </Select>
                        </FormControl>
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
                                {orgaizaciones.map(org => {
                                    return (<option value={org.id}>{org.name}</option>)
                                })}
                            </Select>
                        </FormControl>

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}
                            onClick={handleButtonClick}
                        >
                            Crear
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        <br></br>
                        <br></br>

                    </div>
                </form>

            </div >
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container >

    );
};

export default Register;



