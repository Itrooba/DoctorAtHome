import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import '../Appointment/styling.css';

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
      table: {
        minWidth: '650',
        // tableLayout: 'fixed',
        justifyContent: 'left',
        justifyItems: 'left',
        alignItems: 'left',
      },
  }));
  function createData(SrNo,MeetingDate,StartTime,EndTime,Report,Prescription,) {
    return {SrNo,MeetingDate,StartTime,EndTime,Report,Prescription,};
  }
  
  const rows = [
    createData('1', '02-Jan-21','2:00pm','2:20pm','Report','Prescription',),
    createData( '2', '06-Jan-21','2:20pm','2:40pm','Report','Prescription',),
    createData('3', '12-Jan-21', '2:40pm','3:00pm','Report','Prescription',),
  ];
  
  export default function DiagnosisRecord() {
    const classes = useStyles();
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
                        Diagnosis Record
                    </Typography>
                    </div>
                </div>
            </div>
        </div>
    </section>
     <br/>
     <Container maxWidth="md" fixed>
      
      <Paper className={classes.paper} elevation={14}>
      <Grid container >
      
      <TableContainer component={Paper}>
        <br/>
      <Typography variant="h6" align="center" gutterBottom>
          View Diagnosis Record
    </Typography>
    <br/>
   
    <Table className={classes.table} aria-label="caption table">
      
      <TableHead>
        <TableRow>
          
          <TableCell align="center" >sr:#</TableCell>
          <TableCell align="center" >Meeting Date</TableCell>
          <TableCell align="center" >Start Time</TableCell>
          <TableCell align="center" >End Time</TableCell>
          <TableCell align="center" >Report</TableCell>   
          <TableCell align="center" >Prescrition</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.SrNo}>
            <TableCell component="th" scope="row">
       {row.SrNo}
            </TableCell>
           
            <TableCell align="center">{row.MeetingDate}</TableCell>
            <TableCell align="center">{row.StartTime}</TableCell>
            <TableCell align="center">{row.EndTime}</TableCell>
            <TableCell align="center">{row.Report}</TableCell>
            <TableCell align="center">{row.Prescription}</TableCell>
            
          </TableRow>
          
        ))}
      </TableBody>
    </Table> 
    <br />
    <Button variant="contained" color="primary" href="#contained-buttons" style={{float:'right',marginRight:'10px'}} >Attach Report</Button>  
  </TableContainer>
  
      </Grid>
    
      </Paper>
      
  </Container>
    

    </div>
    );
  }