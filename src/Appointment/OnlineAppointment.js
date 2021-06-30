import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import './styling.css';
import { useParams} from 'react-router';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
      },
      avatar: {
        margin: theme.spacing(1),
        marginLeft: '40%',
        height: '130px',
        width: '130px',
      },
      dates:
      {
        margin: theme.spacing(0.5),
      },
      fileds:
      {
        margin: theme.spacing(1),
      },
     
  }));
  
  function OnlineAppointment() {
    const [selected_time,setselected_time] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [accountant_name, setaccountant_name] = useState('');
    const [transaction_id, settransaction_id] = useState('');
    const [loading, setloading] = useState(false);
    const [submit, setsubmit] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const classes = useStyles();
    const {type} = useParams();
    const {OnlineFee} = useParams();
   // const {id} = useParams();
    const {doc} = useParams();
    //console.log(type + fee);

        // The first commit of Material-UI
        const [selectedDate, setSelectedDate] = React.useState(new Date());
        const handleDateChange = (date) => {
          setSelectedDate(date);
        };
    var one = [];
    const getinfo = async()=>{
      setloading(true);
      // Make a request for a user with a given ID
      const response =await axios.get('http://localhost:5000/api/auth/OnlineBookingTime/' + doc);
      if (response.status === 200) {
        one = response.data;
      } else {
       console.log("Error"); 
      }
    }
    var two = [];
    const appoint_list = async()=>{
      const de = moment( selectedDate).format("MMMM Do YYYY");
      // Make a request for a user with a given ID
      const response = await axios.get('http://localhost:5000/api/auth/OnlineAppointments/' + doc + '/' + de);
      if (response.status === 200) {
        //setapoint(response.data);
        two = response.data;
        finalterm2();
        setloading(false);
      } else {
        console.log("Error");
      }
    }
    const [final, setfinal] = useState([]);

    const finalterm2=()=>{
      two.map(function(val,i){
         return one.splice(one.findIndex(item => item.Time === val.Time), 1)
      })
      setfinal(one);
    }

    const book_appointment = async()=>{
      try{
      const response = await axios.post('http://localhost:5000/api/auth/OnlineAppointments', {
        AppDate:moment( selectedDate).format("MMMM Do YYYY"),
        OnlineTime:selected_time,
        doc_id:doc,
        Service:type,
        OnlineFee:OnlineFee,
        Name:name,
        Email:email,
        mobile_no:phone,
        Accountant_Name: accountant_name,
        Transaction_id: transaction_id
      },
      alert("Appointment Booked, Confirmation email will be sent to you.."));
      if (response.status === 200) {
        
        setsubmit(!submit);
        
        document.getElementById("Appoint").reset();
        
      } 
      else{
      
       console.log("Error");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
    }
    console.log(loading);

    useEffect(()=>{
      getinfo();
      appoint_list();
    },[selectedDate,submit]);
    
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);

    return (
        <div className={classes.root} >
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
                        Consult a Doctor Online
                    </Typography>
                    </div>
                </div>
            </div>
        </div>
    </section>
     <br/>

      <Paper className={classes.paper} elevation={14}>

      <Avatar className={classes.avatar}>
          
        </Avatar>
            <Typography component="h4" variant="h5" align="center" color="textSecondary" style={{fontFamily:'Segoe UI'}}>
                {doc} 
            </Typography>
      </Paper>
      <br/>
      <Paper className={classes.paper} elevation={14}>
      <div className='col-md-5 mx-auto align-self-center'>
                    {errorMsg && <p style={{color:"red" , fontSize: "20px"}}>{errorMsg}</p>}
                    </div>
            <Typography component="h5" variant="h6" align="left" color="textSecondary" style={{fontFamily:'Segoe UI'}}>
              Select Date: 
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          minDate={new Date()}
          maxDate={tomorrow}
          id="date-picker-inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
            <Typography component="h5" variant="h6" align="left" color="textSecondary" style={{fontFamily:'Segoe UI'}}>
              Select Time: 
            </Typography>
            {final.map(function(element, i) {
                  return element.OnlineTime === selected_time ?
                  <Chip key={i} className={classes.dates} label={element.OnlineTime} color="secondary" component="a" onClick={()=>{setselected_time(element.OnlineTime)}} clickable />
                    :
                  <Chip key={i} className={classes.dates} label={element.OnlineTime} color="primary" component="a" onClick={()=>{setselected_time(element.OnlineTime)}} clickable />
              })}
              {loading?<CircularProgress color="secondary" size={20} />:null}

      </Paper>
      <br/>
      <Paper className={classes.paper} elevation={14}>
            <Typography component="h6" variant="h6" align="center" style={{fontFamily:'Segoe UI',}}>
              Enter Details To Book Appointment for Online Consultation <br /> You must submit Fee first, and fill out the required detais for verification.
            </Typography>
            
            <Divider variant="middle" style={{marginLeft:'30%',marginRight:'30%',backgroundColor:'#3f51b5'}} /> 
      <br/>
            <form className={classes.root}  autoComplete="off" onSubmit={book_appointment}>
              <TextField   required  
        onChange={(event) => {setname(event.target.value)}} className={classes.fileds}  id="outlined-basic" label="Name" variant="outlined" />
              <TextField  required  onChange={(event) => {setphone(event.target.value)}} className={classes.fileds} id="outlined-basic" label="Phone Number" variant="outlined" />
              <TextField  required onChange={(event) => {setemail(event.target.value)}} className={classes.fileds} id="outlined-basic" label="Email" variant="outlined" />
        <TextField   required      value={accountant_name}
        onChange={(event) => {setaccountant_name(event.target.value)}} className={classes.fileds} id="outlined-basic" label="Accountant Name" variant="outlined" />
        <TextField     onChange={(event) => {settransaction_id(event.target.value)}} className={classes.fileds} id="outlined-basic" label="Account No/Transaction Id" variant="outlined" />
              <br/>
              <Button size="large" variant="contained" color="primary"  type="submit"
        >
                Book Appointment
              </Button>
            </form>
      </Paper>

    </div>
    );
  }

  export default OnlineAppointment;