import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import picture1 from '../images/picture1.png';
import { useParams} from 'react-router';
import { AppBar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {logout } from '../helpers/auth';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "voilet",

  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },  
  padd:{
    paddingRight: 10,
  },
  img:{
    height: '70px',
    width: '70px',
 }
}));


export default function Header(props) {
  const classes = useStyles();
  const {name} = useParams();
const {email} = useParams();
let history = useHistory();
const handleLogout = (evt) => {
  logout(() => {
      history.push('/login');
  });
};
 // const { sections, title } = props;

  return (
    <React.Fragment>
    
      <Toolbar className={classes.toolbar}>
      <img  src ={picture1} className={classes.img} alt="logo" />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Doctor at Home
        </Typography>
                  
        <Button variant="contained"   color="primary"  onClick={handleLogout}>
                      Logout
                    </Button>
                  
      </Toolbar>
      <AppBar  position="static">
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
      <Link
            color="inherit"
            noWrap
            variant="h6"
            href={'/patientHome/' + name + "/"+ email}
            className={classes.toolbarLink}
          >
            Home
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h6"
            href={"/onclinicapp/"  + name + "/" + email}
            className={classes.toolbarLink}
          >
            Clinic Appointments
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h6"
            href={"/onlineapp/" + name + "/" + email}
            className={classes.toolbarLink}
          >
            Online Consultation
          </Link>
          <Link
            color="inherit"
            noWrap
            variant="h6"
            href={"/complain/"  + email}
            className={classes.toolbarLink}
          >
            Complaints
          </Link>
      </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};