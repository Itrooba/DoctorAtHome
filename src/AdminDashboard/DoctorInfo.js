import React, { useState}from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { doctorInfo } from '../api/auth';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
  }));
export default function RegisterDoctor() {
  const [Time, setTime] = useState('');
  const [OnlineTime, setOnlineTime] = useState('');
  // backend connect  
    const [formData, setFormData] = useState({
        Name: '',
        Speciality: '',
        ClinicFee: '',
        OnlineFee: '',
        SetOnline: '',
        successMsg: false,
        errorMsg: false,
    });
    const {
        Name,
        Speciality,
        ClinicFee,
        OnlineFee,
        SetOnline,
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
            isEmpty(Name) ||
            isEmpty(Speciality) ||
            isEmpty(ClinicFee) 
        ) {
            setFormData({
                ...formData,
                errorMsg: 'All fields are required',
            });
        } else {
            const { Name, Speciality, ClinicFee, OnlineFee, SetOnline} = formData;
            const data = { Name, Speciality, ClinicFee, OnlineFee, SetOnline};
            setFormData({ ...formData, loading: true });

            doctorInfo(data)
                .then((response) => {
                    console.log('Axios signup success: ', response);
                    setFormData({
                        Name: '',
                        Speciality: '',
                        ClinicFee: '',
                        OnlineFee: '',
                        SetOnline: '',
                        successMsg: response.data.successMessage,
                    });
                    alert('Successfully Saved')
                    document.getElementById("Registeration").reset();
                })
                .catch((err) => {
                    console.log('Axios signup error: ', err);
                    setFormData({
                        ...formData,
                        errorMsg: err.response.data.errorMessage,
                    });
                });

              };

    };

    const [errMsg, setErrorMsg] = useState('');
    const [erMsg, setError] = useState('');
    const AddNew = (evt) => {
      evt.preventDefault();
      const registerd={
        doc_id: Name,
        Time: Time,
      };
      console.log(JSON.stringify(registerd));
      axios.post('http://localhost:5000/api/auth/BookingTime',registerd)
      .then((response )=> {
          if (response.status === 200) {
              alert("Done")
            } 
            else{
           // setErrorMsg("Booking Time already exist")
             console.log("Error");
            }
      console.log(response.data)
      setErrorMsg("")
      }).catch((error)=> {
          error.response && setErrorMsg(error.response.data);
      })
    }

    const OnlineBoking = (evt) => {
      evt.preventDefault();
      const registerd={
        doc_id: Name,
        OnlineTime: OnlineTime,
      };
      console.log(JSON.stringify(registerd));
      axios.post('http://localhost:5000/api/auth/OnlineBookingTime',registerd)
      .then((response )=> {
        if (response.status === 200) {
          alert("Done")
        } 
        else{
      //  setError("Booking Time already exist")
         console.log("Error");
        }
  console.log(response.data)
  setErrorMsg("")
  }).catch((error)=> {
      error.response && setError(error.response.data);
  })
}

//backend end
    const classes = useStyles();
  return (
      <Container maxWidth="lg" fixed>
    <Paper className={classes.paper} elevation={14}>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Add Doctor's Information
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
            name="Name"
            label="Name"
            value= {Name}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Speciality"
            name="Speciality"
            label="Speciality"
            value= {Speciality}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ClinicFee"
            name="ClinicFee"
            type="string"
            label="Clinic Fee"
            value= {ClinicFee}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="OnlineFee"
            name="OnlineFee"
            type="string"
            label="Online Fee"
            value= {OnlineFee}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
       <br /> <Typography variant='h5'>Booking Times for Clinic Checkup</Typography> <br />
        <div className='col-md-5 mx-auto align-self-center'>
            {errMsg && <p style={{color:"red" , fontSize: "20px"}}>{errMsg}</p>}
        </div>
        <TextField
        id="time"
        required
        label="Set Clinic Time"
        type="time"
      //  value= {Time}
        name="Time"
        className={classes.textField}
        onChange={e => setTime(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
            <Button size="large" variant="contained" onClick={AddNew} color="primary" type="submit">
                Add 
            </Button> <br /> <br />
            <Typography variant='h5'>Booking Times for Online Consultation </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <FormControl component="fieldset">
        <FormLabel component="legend">Select </FormLabel>
        <RadioGroup aria-label="quiz" name="SetOnline" value={SetOnline} onChange={handleChange}>
          <FormControlLabel value="1" control={<Radio />} label=" Enable Online Checkup" />
        </RadioGroup>
      </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
        <div className='col-md-5 mx-auto align-self-center'>
                    {erMsg && <p style={{color:"red" , fontSize: "20px"}}>{erMsg}</p>}
                    </div>
        <TextField
        id="time"
        required
        label="Set Online Time"
        type="time"
       // value= {OnlineTime}
        defaultValue = " "
        name="Time"
        className={classes.textField}
        onChange={e => setOnlineTime(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
            <Button size="large" variant="contained" onClick={OnlineBoking} color="primary" type="submit">
                Add 
            </Button>
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