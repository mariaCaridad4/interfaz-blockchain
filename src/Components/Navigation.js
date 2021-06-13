import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles  } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './styles/index.css';

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



class Navigation extends Component {
    
    render() {
        const { classes } = this.props;
        let buttons;

        if (this.props.user) {
            buttons = (
                <div>
                    <Button color="inherit"><Link className={classes.link} to='/' onClick={() => localStorage.clear()}>Log Out</Link></Button>
                </div>
            )
        } else {
            buttons = (
                <div>
                    <Button color="inherit"><Link className={classes.link} to='/register'>Register</Link></Button>
                    <Button color="inherit"><Link className={classes.link} to='/login'>Log In</Link></Button>
                </div>
            )
        }
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link className={classes.link} to='/'>Home</Link>
                        </Typography>
                        {buttons}
                    </Toolbar>
                </AppBar>
            </div>


        )
    }

}

export default withStyles(useStyles)(Navigation)