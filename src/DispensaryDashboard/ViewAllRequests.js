import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';

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





export default function ViewComplaints() {
  const classes = useStyles();
 
  const [complain , Setcomplain]= useState("");

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/api/auth/orderdata')

    console.log(response.data)
    Setcomplain(response.data);
  
  }

  useEffect(() => {
    fetchData();
  }, []);

  const SetStatus=async (id)=>{
    
    const newstatus= prompt("Enter Status:");
    var Status={}
      if(newstatus===null){
        Status={
            status:""
                }
                alert("Cancelled")
      }
      else{
        Status={status:newstatus}
        alert("Status Update")
      }
      axios.patch(`http://localhost:5000/api/auth/order/${id}`,Status)
      .then(response => console.log(response.data),fetchData());
     
    }
    const Delete =async (id)=>{
      var answer=window.confirm('Are you sure to Delete this Record?')
      if(answer===true){
        await axios.delete(`http://localhost:5000/api/auth/order/${id}`)
        .then(()=>{
              fetchData();
        }) }
       
      }

  function showComplain(feeds) {
    if (feeds && feeds.length > 0) {
      var response = feeds.map((row, i) => {
       
        return <TableRow key={i}>
        
        <TableCell component="th" scope="row" align="center">
          {i + 1}
        </TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.days}</TableCell>
        <TableCell align="center">{row.adress}</TableCell>
        <TableCell align="center">{row.phonenumber}</TableCell>
        <TableCell align="center"> {<Button variant="contained" color="primary" onClick={()=>SetStatus(row._id) }>SetStatus</Button>}</TableCell>
        <TableCell>{<img style={{width: "350px",height:"350px"}} src={require(`../uploads/${row.orderImage}`).default } alt="prescrip"></img>}</TableCell> 
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center"> {<Button variant="contained" color="primary" onClick={()=>Delete(row._id) }>Delete</Button>}</TableCell>
        <TableCell>
      
    
       </TableCell>
        </TableRow>
      })
      return response;
    }
  }


  return (
    <Container maxWidth="md" fixed>
      
        <Paper className={classes.paper} elevation={14}>
        <Grid container >
        
        <TableContainer component={Paper}>
          <br/>
        <Typography variant="h6" align="center" gutterBottom>
          
      </Typography>
      <br/>
     
      <Table className={classes.table} aria-label="caption table">
        
        <TableHead>
          <TableRow>
            <TableCell align="center">Sr.#</TableCell>
            <TableCell align="center" >Name</TableCell>
            <TableCell align="center" >days</TableCell>
            <TableCell align="center" >Address</TableCell>
            <TableCell align="center" >Phone</TableCell>
            <TableCell align="center" ></TableCell>
            <TableCell align="center" >Prescription</TableCell>
            <TableCell align="center" >Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {showComplain(complain)}
        </TableBody>
      </Table>
    
    </TableContainer>
        </Grid>
       
        </Paper>
        
    </Container>
   
  );
}
