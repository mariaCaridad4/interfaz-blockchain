import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import './styles/index.css';

import middleware from '../server/middleware';
import { logout } from '../actions/auth';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: "white",
        textDecoration: "none",
    }
});


const Navigation = (props) => {
    console.log("AQUIIIIII NAVIGATIOn")
    let user = sessionStorage.getItem('user');

    const [ isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [ primera, setPrimera] = React.useState(true);

    const dispatch = useDispatch();
    const [isvalidToken, setIsValidToken] = React.useState(false);

    const { classes } = props;
    let buttons;
    let history = useHistory()

    // React.useEffect(() => {
    //     console.log("ATRAPADO")
    //     //Calling to middleware for display ended session Alert
    //     check_token_alive();
    // }, []);

    // const check_token_alive = async () => {
    //     if(primera){
    //         try {
    //             let response = await middleware.verify_token();
    //             if (!response) {
    //                 console.log("token expirado");
    //                 // console.log('res',res)
    //                 // clearInterval(interval_id);
    //                 setIsValidToken(true);
    //             }else{
    //                 setIsLoggedIn(true);
    //             }

    //         } catch (e) {
    //             console.log(e);
    //         }
    //         setPrimera(true)
    //     }else{
    //         let interval_id = setInterval(async () => {
    //             try {
    //                 let response = await middleware.verify_token();
    //                 if (!response) {
    //                     console.log("token expirado");
    //                     // console.log('res',res)
    //                     clearInterval(interval_id);
    //                     setIsValidToken(true);
    //                 }else{
    //                     setIsLoggedIn(true);
    //                 }
    
    //             } catch (e) {
    //                 console.log(e);
    //             }
    //         }, 5000);
    //     }
       
    // };

   
    // if (!isLoggedIn) {
    //     return <Redirect to="/" />;
    // }
    user = JSON.parse(String(sessionStorage.getItem("user")));
    console.log("USUARIO DE NAVIGATION");
    console.log(user);

    if (user) {
        buttons = (
            <div>
                <Button color="inherit"><Link className={classes.link} to='/' onClick={() => {sessionStorage.clear() }}>Salir</Link></Button>
            </div>
        )
    } else {
        buttons = (
            <div>
                {/* <Button color="inherit"><Link className={classes.link} to='/register'>Registrarse</Link></Button> */}
                <Button color="inherit"><Link className={classes.link} to='/login'>Ingresar</Link></Button>
                {/* <Button color="inherit"><Link className={classes.link} to='/medico'>PAciente</Link></Button> */}
            </div>
        )
    }


    return (
        <div className={classes.root}>
            {isvalidToken && (
                <Alert
                    severity="warning"
                    isOpen={true}
                    onDidDismiss={() => dispatch(logout())}
                    header={"Ups !"}
                    message={
                        "Su sesi??n ha finalizado. Por favor, inicie sesi??n nuevamente."
                    }
                    buttons={["OK"]}
                    backdropDismiss={false}
                >
                </Alert>
            )}

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to='/'>Inicio</Link>
                    </Typography>
                    {buttons}
                </Toolbar>
            </AppBar>
        </div>


    )


}

export default withStyles(useStyles)(Navigation)