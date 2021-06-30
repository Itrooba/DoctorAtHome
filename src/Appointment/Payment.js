import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './styling.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow:1,
      textAlign: 'left',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
        marginBottom: theme.spacing(6),
      },
      fileds:
      {
        margin: theme.spacing(1),
      }
  }));
  
  export default function Payment() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Poly Clinic
          </Typography>
        </Toolbar>
      </AppBar>
    
      
      <section class="hero-area bg-img bg-overlay-2by5" className="mainFeaturedPost">
        <div class="container h-100" >
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    
                    <div class="hero-content text-center">
                      <br/><br/><br/><br/><br/>
                    <Typography component="h2" variant="h3" align="center" style={{color: '#3f51b5'}} gutterBottom>
                        Add Payment
                    </Typography>
                    </div>
                </div>
            </div>
        </div>
    </section>
     <br/>
      <Paper className={classes.paper} elevation={14}>
            <Typography component="h6" variant="h6" align="center" style={{fontFamily:'Segoe UI',}}>
              Enter payment details for online consultation
            </Typography>
            
            <Divider variant="middle" style={{marginLeft:'30%',marginRight:'30%',backgroundColor:'#3f51b5'}} /> 
    <br/>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField className={classes.fileds}  id="outlined-basic" label="Name" variant="outlined"/> <br/>
              <TextField className={classes.fileds} id="outlined-basic" label="Transaction ID" variant="outlined"/> <br/>
              <TextField className={classes.fileds} id="outlined-basic" label="Amount" variant="outlined"/> <br/>
              {/*<TextField className={classes.fileds} id="outlined-basic" label="Cnic" variant="outlined"/>*/}
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            style={{marginTop: 40, fontSize: 20}}
          />
          <label style={{marginTop: 40}}>
            <Button variant="contained" color="primary" component="span" onClick={handleClickOpen}>
              Submit
            </Button>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You must be registered to the system to attend the online consultation. If you are registered then you have to be logged in to the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus href= "/registrationform">
            Register
          </Button>
        </DialogActions>
      </Dialog>
          </label>
        </div>
            </form>
      </Paper>

    </div>
    );
  }