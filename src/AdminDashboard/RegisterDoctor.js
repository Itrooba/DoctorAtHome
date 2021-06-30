import React, { useState}from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { signup } from '../api/auth';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
      },
  }));
export default function RegisterDoctor() {
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
        role,
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
            isEmpty(password2) ||
            isEmpty(role) 
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
  return (
      <Container maxWidth="lg" fixed>
    <Paper className={classes.paper} elevation={14}>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Register User Here
      </Typography>
      <form id="Registeration" className={classes.form} onSubmit={handleSubmit} noValidate>
      <div className='col-md-5 mx-auto align-self-center'>
        <p style={{color:"red" , fontSize: "20px"}}>
                    {successMsg && showSuccessMsg(successMsg)}
                    {errorMsg && showErrorMsg(errorMsg)}
                    </p>
                    </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Name"
            name="name"
            label="Name"
            value= {name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Email"
            type="email"
            name="email"
            label="Email"
            value= {email}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Cnic"
            name="cnic"
            label="Cnic"
            placeholder="*************"
            value= {cnic}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Phone"
            name="phone"
            type="string"
            placeholder="0***-*******" 
            pattern="[0-9]{4}-[0-9]{7}"
            label="Phone"
            value= {phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Password"
            name="password"
            label="Password"
            type= "password"
            value= {password} 
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Password2"
            name="password2"
            label="Confirm Password"
            type= "password"
            value= {password2} 
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl component="fieldset">
        <FormLabel component="legend">Select Role</FormLabel>
        <RadioGroup aria-label="quiz" name="role" value={role} onChange={handleChange}>
          <FormControlLabel value="1" control={<Radio />} label="Dispenser" />
          <FormControlLabel value="2" control={<Radio />} label="Doctor" />
        </RadioGroup>
      </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
            <Button size="large" variant="contained" color="primary" type="submit">
                SUBMIT
            </Button>
        </Grid>
      </Grid>
      </form>
    </React.Fragment>
    </Paper>
    </Container>
  )
}