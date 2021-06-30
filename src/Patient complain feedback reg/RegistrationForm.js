import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Apbar from '../Appbar';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { signup } from '../api/auth';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Registration() {
  let history = useHistory();
 // backend connect  
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      cnic: '',
      phone: '',
      password: '',
      password2: '',
      role: 0,
      successMsg: false,
      errorMsg: false,
      loading: false,
    });
    const {
      name,
      email,
      cnic,
      phone,
      password,
      password2,
      successMsg,
      errorMsg,
    } = formData;
/****************************
* EVENT HANDLERS
***************************/
const handleChange = (evt) => {
  //console.log(evt);
  setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: '',
      errorMsg: '',
  });
};

const handleSubmit = (evt) => {
  evt.preventDefault();

  // client-side validation
  if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(cnic) ||
      isEmpty(phone) ||
      isEmpty(password) ||
      isEmpty(password2) 
  ) {
      setFormData({
          ...formData,
          errorMsg: 'All fields are required',
      });
  } else if (!isEmail(email)) {
      setFormData({
          ...formData,
          errorMsg: 'Invalid email',
      });
  } else if (!equals(password, password2)) {
      setFormData({
          ...formData,
          errorMsg: 'Passwords do not match',
      });
  } else {
      const { name, email, cnic, phone, password, password2, role } = formData;
      const data = { name, email, cnic, phone, password, password2, role };

      setFormData({ ...formData, loading: true });

      signup(data)
          .then((response) => {
              console.log('Axios signup success: ', response);
              setFormData({
                  name: '',
                  email: '',
                  cnic: '',
                  phone: '',
                  password: '',
                  password2: '',
                  role: 0,
                  loading: false,
                  successMsg: response.data.successMessage,
              });
              document.getElementById("Registeration").reset();
              history.push('/login');
          })
          .catch((err) => {
              console.log('Axios signup error: ', err);
              setFormData({
                  ...formData,
                  loading: false,
                  errorMsg: err.response.data.errorMessage,
              });
          });
  }
};

//backend end

  const classes = useStyles();
  //const [value, setValue] = React.useState(new Date());

  return (
    <>
    <Apbar></Apbar>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <div className={classes.paper}>
     
        <Avatar className={classes.avatar}>
         
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration Form
        </Typography>
        <form id="Registeration" className={classes.form} onSubmit={handleSubmit} noValidate>
        <div className='col-md-5 mx-auto align-self-center'>
        <p style={{color:"red" , fontSize: "20px"}}>
                    {successMsg && showSuccessMsg(successMsg)}
                    {errorMsg && showErrorMsg(errorMsg)}
                    </p>
                    </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                value= {name}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cnic"
                label="CNIC"
                name="cnic"
                value= {cnic}
                onChange={handleChange}
                autoComplete="cnic"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                value= {phone}
                onChange={handleChange}
                autoComplete="phone"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required ="true"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                 type="email"
                 value= {email}
            onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value= {password}
                onChange={handleChange}
              />
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                value= {password2}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
         
        </form>
      </div>
      <Box mt={5}>
       
      </Box>
    </Container>
    </>
  );
}