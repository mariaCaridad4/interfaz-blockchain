  import React from 'react';
  import clsx from 'clsx';
  import { makeStyles } from '@material-ui/core/styles';
  import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
  import Button from '@material-ui/core/Button';
  import Divider from '@material-ui/core/Divider';
  import Typography from '@material-ui/core/Typography';
  
  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  
  export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
      bottom: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Typography variant="body2" color="textSecondary" align="center" >
        <br></br>
            Autores: {'María Caridad Cáceres - Daniel Fabricio Peralta '}
        <br></br>
            Director: {'Ing. Villie Morocho Z. PhD.'}
        <br></br>
        {new Date().getFullYear()}
        {'.'}
        <br></br>
        <br></br>
      </Typography>
        <Divider />
        <Typography variant="body2" color="textSecondary" align="center">
        <br></br>
            UNVERSIDAD DE CUENCA
        <br></br>
          INTRATEC S.A.S.
          <br></br>
          <br></br>
      </Typography>
      </div>
    );
  
    return (
        <div align='center'>
        {['bottom'].map((anchor) => (
          <React.Fragment key={anchor}>
            
            <Button onClick={toggleDrawer(anchor, true)}>Más Información </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    );
  }
  