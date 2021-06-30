import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Back2 from  '../images/Back2.jpg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import { showErrorMsg } from '../helpers/message';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { signin } from '../api/auth';
import Homebar from './Homebar';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
    overflow: 'auto',
  },
  image: {
    backgroundImage:`url(${Back2})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function SignInSide(Id, Name, Email) {

  //backend start******
  let history = useHistory();

  /*  useEffect(() => {
        if (isAuthenticated() && isAuthenticated().role === 1) {
            history.push('/dispensaryHome');
        } else if (isAuthenticated() && isAuthenticated().role === 2) {
            history.push('/doctorHome');
        }
        else {
          history.push('/adminDashboard');
      }
    }, [history]);*/

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errorMsg: false,
    });

    const { email, password, errorMsg } = formData;

    /****************************
     * EVENT HANDLERS
     ***************************/
    const handleChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            errorMsg: '',
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        // client-side validation
        if (isEmpty(email) || isEmpty(password)) {
            setFormData({
                ...formData,
                errorMsg: 'All fields are required',
            });
        } else if (!isEmail(email)) {
            setFormData({
                ...formData,
                errorMsg: 'Invalid email',
            });
        } else {
            const { email, password } = formData;
            const data = { email, password };
            setFormData({ ...formData, loading: true });

            signin(data)
                .then((response) => {
                  document.getElementById("Signin").reset();
                    setAuthentication(response.data.token, response.data.user);
                    Name= isAuthenticated().name;
                    Email= isAuthenticated().email;
                    Id = isAuthenticated()._id;
                    if (isAuthenticated() && isAuthenticated().role === 1) {
                        console.log('Redirecting to Dispensary dashboard');
                        history.push('/dispensaryHome/' + Name);
                    }
                    else if (isAuthenticated() && isAuthenticated().role === 2) {
                      
                      console.log('Redirecting to Doctor dashboard');
                      history.push('/doctorHome/'+ Name);
                  } 
                  else if (isAuthenticated() && isAuthenticated().role === 3) {
                      
                    console.log('Redirecting to Admin dashboard');
                    history.push('/adminDashboard');
                } 
                    else {
                        console.log('Redirecting to Patient dashboard');
                        history.push('/patientHome/' + Name + "/"+ Email);
                    }
                })
                .catch((err) => {
                    console.log('signin api function error: ', err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    });
                });
        }
    };

    /****************************
     * VIEWS
     ***************************/

     const [open, setOpen] = React.useState(false);

     const handleClickOpen = () => {
       setOpen(true);
     };
   
     const handleClose = () => {
       setOpen(false);
     };
  const classes = useStyles();

  return (
    <div >
      <Homebar />
    <Grid container component="main" className={classes.root} >
       
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form id="Signin" className={classes.form} onSubmit={handleSubmit} noValidate>
          <div className='col-md-5 mx-auto align-self-center'>
            <br />
                    {errorMsg && showErrorMsg(errorMsg)}
                    <br /> <br />
                </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value= {email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value= {password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
            />
            <Button
              id="signin"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
              <label style={{marginTop: 40}}>
              <Button variant="contained" fullWidth color="primary" component="span" onClick={handleClickOpen}>
              Forgot password
            </Button>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Forgot Password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please contact to the Administration to resolve the issue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      </label>
      <Grid container>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    </div>
  );
}