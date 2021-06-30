import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { Grid } from '@material-ui/core';
// import { MailBox,PersonIcon,Calender, } from '@material-ui/icons';
import { CalendarToday , PersonAdd , Error , MonetizationOn , Create }from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
      },
     
  }));

export default function Home() {
    const classes = useStyles();
    return (
    <Container maxWidth="lg" fixed >
        <Paper className={classes.paper} elevation={14}>
      <Grid container spacing ={4} >
        <Grid item xs={12} sm={6} md={4}>
      <Card style={{width:"300px",height:"100px"}} >
       <CardContent>
        <PersonAdd/>
        <br/>
        <Typography display="inline" varient="h1"> Registered Doctor</Typography> <Typography display="inline" varient="h1"></Typography>
       </CardContent>
     </Card>
     </Grid>

     <Grid item xs={12} sm={6} md={4}>
      <Card style={{width:"300px",height:"100px"}}>
       <CardContent>
         <CalendarToday />
         <br/>
        <Typography display="inline" varient="h1">Appointments</Typography>  <Typography display="inline" varient="h1"></Typography>
       </CardContent>
     </Card>
     </Grid>

     <Grid item xs={12} sm={6} md={4}>
      <Card style={{width:"300px",height:"100px"}}>
       <CardContent>
         <MonetizationOn/>
         <br/>
        <Typography display="inline" varient="h1">Payments</Typography> <Typography display="inline" varient="h1"></Typography>
       </CardContent>
     </Card>
     </Grid>

     <Grid item xs={12} sm={6} md={4}>
      <Card style={{width:"300px",height:"100px"}}>
       <CardContent>
         <Error/>
         <br/>
        <Typography display="inline" varient="h1">Complaints</Typography>  <Typography display="inline" varient="h1"></Typography>
       </CardContent>
     </Card>
     </Grid>

     <Grid item xs={12} sm={6} md={4}>
      <Card style={{width:"300px",height:"100px"}}>
       <CardContent>
         <Create/>
         <br/>
        <Typography display="inline" varient="h1">Feedbacks</Typography>  <Typography display="inline" varient="h1"></Typography>
       </CardContent>
     </Card>
     </Grid>
      </Grid> 
    </Paper>
    </Container>
  );
}