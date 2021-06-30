import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BasicButtonGroup() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     
      <ButtonGroup variant="contained"  color="primary" aria-label="contained primary button group">
        <Button style= {{marginRight: '10px'}} href="/docinfo"> Appointment</Button>
        <Button style= {{marginRight: '10px'}} href= "/registrationform">Register</Button>
        <Button href= "/login">Login</Button>
      </ButtonGroup>
     
    </div>
  );
}