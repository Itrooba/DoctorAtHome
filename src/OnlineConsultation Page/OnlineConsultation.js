import React from "react";
import Apbar from '../Appbar';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ButtonGroup from './OnlineConButton'
const useStyles = makeStyles(theme => ({
   
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6)
    },
    heroButtons: {
      marginTop: theme.spacing(4)
    }
    
  }));
export default function OnlineConsultation() {
    const classes = useStyles();
   
    return (
      <>
<Apbar />
<div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h3"
                  align="left"
                  color="textPrimary"
                  gutterBottom
                >
                  Online Consultation
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                 // color="textSecondary"
                  paragraph
                >
                  You can attend video meeting with your doctor and view your diagnostic record after Booking Appointment for Online Consultation.
                  You have to register to the Website and then Login to view your Appointments And Attend the Meeting. 
                  <br /><br />  Note: Use the same Email for Registeration and Appointment Booking.
                </Typography>
                
                 <ButtonGroup /> <br /> 
                <Typography
                  variant="h6"
                  align="center"
                 // color="textSecondary"
                  paragraph
                >
                  Online consultation saves a lot of time and money in many conditions including: <br />
                  When you need an advice from doctor <br />
                  When you need second opinion <br />
                  When you need to get instant guidance <br />
                  When you need authentic information about your medicial condition <br />
                  When your doctor lives in another city <br />
                  and many more... 
                </Typography>
                      
              </Container>
              
              </div>
      </>
    );
  }