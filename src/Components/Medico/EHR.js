import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
  

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'María Caridad Cáceres - Daniel Fabricio Peralta '}
        <br></br>
          INTRATEC S.A.{' '}
        {new Date().getFullYear()}
        {'.'}
        <br></br>
        <br></br>
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
        width: 800,
        marginTop: theme.spacing(5),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
        paddingLeft: theme.spacing(7),
        marginTop: theme.spacing(-2),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    table: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
}));


function createData(titulo, datos) {
    return {
        titulo,
        datos
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.table}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.titulo}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                {row.titulo}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {row.datos.map((historyRow) => (
                                        <TableRow key={historyRow.name}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.name}
                                            </TableCell>
                                            <TableCell align="left">{historyRow.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


const rows = [
    createData('Datos del Paciente y Motivos de la Consulta', [
        { name: 'Nombre', value: 'María Caridad Cáceres Salamea' },
        { name: 'Edad', value: '22' },
        { name: 'Ocupación', value: 'Ingeniera de Sistemas' },
        { name: 'Estado Civil', value: 'Soltera' },
        { name: 'Ecolaridad', value: 'Tercer Nive' },
    ]),
    createData('Estado actual de salud', [
        { name: 'Nombre', value: 'María Caridad Cáceres Salamea' },
        { name: 'Edad', value: '22' },
        { name: 'Ocupación', value: 'Ingeniera de Sistemas' },
        { name: 'Estado Civil', value: 'Soltera' },
        { name: 'Ecolaridad', value: 'Tercer Nive' },
    ]),
    createData('Enfermedades Crónicas', [
        { name: 'Nombre', value: 'María Caridad Cáceres Salamea' },
        { name: 'Edad', value: '22' },
        { name: 'Ocupación', value: 'Ingeniera de Sistemas' },
        { name: 'Estado Civil', value: 'Soltera' },
        { name: 'Ecolaridad', value: 'Tercer Nive' },
    ]),
];


const person = '/public/logo192.png';
const cedula = '0106056633';


export default function SignIn() {
    const classes = useStyles();

    return (
        <Container component="main" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIcon />
                </Avatar>
                <Typography component="h1" variant="h5">EHR</Typography>
                <Card className={classes.root}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <div className={classes.demo}>
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={person} className={classes.large} />
                                        </ListItemAvatar>
                                        <ListItemText primary={'Nombre'} secondary={cedula} />
                                    </ListItem>
                                </List>
                            </div>
                        </CardContent>
                    </div>
                </Card>

                <Card className={classes.root}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>Historial Clínico Único</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <Row key={row.titulo} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </div>
            <Box mt={8}>
        <Copyright />
      </Box>
        </Container>
    );
}


