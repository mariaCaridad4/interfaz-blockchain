import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CrearUsuario from './Administrador/CrearUsuario';
import ActualizarUsuario from './Administrador/ActualizarUsuario';
import CrearPolitica from './Administrador/CrearPolitica';
import ActualizarPolitica from './Administrador/ActualizarPolitica';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={4}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({

    paper: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(25),
        width: 800,
    },
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Container component="main">
            <CssBaseline />
            <div className={classes.paper}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Crear Usuarios" {...a11yProps(0)} />
                        <Tab label="Actualizar Usuario" {...a11yProps(1)} />
                        <Tab label="Crear Política" {...a11yProps(2)} />
                        <Tab label="Actualizar Política" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <CrearUsuario />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <ActualizarUsuario />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <CrearPolitica />
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <ActualizarPolitica />
                    </TabPanel>
                    
                </SwipeableViews>
            </div>
        </Container>
    );
}