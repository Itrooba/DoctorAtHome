import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: '650',
    // tableLayout: 'fixed',
    justifyContent: 'left',
    justifyItems: 'left',
    alignItems: 'left',
  },
  paper: {
    // padding: theme.spacing(2),
    margin: 'auto',
    // maxWidth: '100%',
  },
});

export default function ViewAppointments() {
  const classes = useStyles();
  
  const [appointment , Setappointment]= useState("");
  const [appoint , Setappointmentonline]= useState("");
  
  const Delete =async (id)=>{
    var answer=window.confirm('Are You Sure to Delete this Record?')
    if(answer===true){
     await axios.delete(`http://localhost:5000/api/auth/appointment/${id}`)
    .then(()=>{
          fetchData();
    }) }
  
  }
  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/api/auth/appointment')

    console.log(response.data)
    Setappointment(response.data);
  }

  useEffect(() => {
    fetchData();
   
  }, []);

 
  function showAppointment(feeds) {
    
    if (feeds && feeds.length > 0) {
      var response = feeds.map((row, i) => {
        return <TableRow key={i}>
        <TableCell component="th" scope="row" align="center">
          {i + 1}
        </TableCell>
        <TableCell align="center">{row.AppDate}</TableCell>
        <TableCell align="center">{row.Name}</TableCell>
        <TableCell align="center">{row.doc_id}</TableCell>
        <TableCell align="center">{row.Service}</TableCell>
        <TableCell align="center">{row.Time}</TableCell>
        <TableCell align="center">{row.Email}</TableCell>
        <TableCell align="center">{row.mobile_no}</TableCell>
        <TableCell align="center">{<Button variant="contained" color="primary" onClick={()=>Delete(row._id) }>Delete</Button>}</TableCell>
      </TableRow>
      })
      return response;
    }
  }
  const DeleteOnline =async (id)=>{
   var answer=window.confirm ('Are you Sure To Delete Data?')
    if(answer===true){
     await axios.delete(`http://localhost:5000/api/auth/onlineapp/${id}`)
    .then(()=>{
          fetchDataa();
    }) }
   
  }
  
  const fetchDataa = async () => {
    const responsee = await axios.get('http://localhost:5000/api/auth/onlineapp')

    console.log(responsee.data)
    Setappointmentonline(responsee.data);
  
  }

  useEffect(() => {
    fetchDataa();
  }, []);

  function showAppointmentonline(feeds) {
    if (feeds && feeds.length > 0) {
      var response = feeds.map((row, i) => {
        return <TableRow key={i}>
        <TableCell component="th" scope="row" align="center">
          {i + 1}
        </TableCell>
        <TableCell align="center">{row.AppDate}</TableCell>
        <TableCell align="center">{row.Name}</TableCell>
        <TableCell align="center">{row.doc_id}</TableCell>
        <TableCell align="center">{row.Service}</TableCell>
        <TableCell align="center">{row.OnlineTime}</TableCell>
        <TableCell align="center">{row.Email}</TableCell>
        <TableCell align="center">{row.mobile_no}</TableCell>
        <TableCell align="center">{row.Accountant_Name}</TableCell>
        <TableCell align="center">{row.Transaction_id}</TableCell>
        <TableCell align="center">{<Button variant="contained" color="primary" onClick={()=>DeleteOnline(row._id)} >Delete</Button>}</TableCell>
        <br></br>
      </TableRow>
      })
      return response;
    }
  }
  return (
        <Grid container >
        <TableContainer component={Paper}>
          <br/>
        <Typography variant="h6" align="center" gutterBottom>
            Clinic Appointments
      </Typography>
      <br/>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr.#</TableCell>
            <TableCell align="center" >Date</TableCell>
            <TableCell align="center" >Patient Name</TableCell>
            <TableCell align="center" >Doctor Name</TableCell>
            <TableCell align="center" >Service</TableCell>
            <TableCell align="center" >Time</TableCell>
            <TableCell align="center" >Email</TableCell>
            <TableCell align="center" >Phone</TableCell>
            <TableCell align="center" >Delete Record</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {showAppointment(appointment)}
        </TableBody>
      </Table>
      <Typography variant="h6" align="center" gutterBottom>
            Online Consultation Appointments
      </Typography>
      <br/>
      <Table className={classes.table} aria-label="caption table">
        <TableHead >
          <TableRow style={ {backgroundColor: '#003399', color: 'white', fontSize: 'large' }}>
            <TableCell align="center">Sr.#</TableCell>
            <TableCell align="center" >Date</TableCell>
            <TableCell align="center" >Patient Name</TableCell>
            <TableCell align="center" >Doctor Name</TableCell>
            <TableCell align="center" >Service</TableCell>
            <TableCell align="center" >Time</TableCell>
            <TableCell align="center" >Email</TableCell>
            <TableCell align="center" >Phone</TableCell>
            <TableCell align="center" >Acountant Name</TableCell>
            <TableCell align="center" >Transaction ID</TableCell>
            <TableCell align="center" >Delete Record</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {showAppointmentonline(appoint)}
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
  );
}
