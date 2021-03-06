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
// import { Link } from  'react-router-dom';
import Navigation from '../Navigation';


import BuscarPaciente from '../Medico/BuscarPaciente';
import Solicitudes from '../Medico/Solicitudes';
import EHR from '../Medico/EHR';
 
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
                <Box p={3}>
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
        <>
        <Navigation></Navigation>
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
                        <Tab label="Buscar Paciente" {...a11yProps(0)} />
                        <Tab label="Solicitudes de Acceso" {...a11yProps(1)} />
                        {/* <Tab label="EHR" {...a11yProps(2)} /> */}
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                    <BuscarPaciente />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    <Solicitudes />
                    </TabPanel>
                    {/* <TabPanel value={value} index={2} dir={theme.direction}>
                        <EHR />
                    </TabPanel> */}
                </SwipeableViews>
            </div>
        </Container>
        </>
    );
}