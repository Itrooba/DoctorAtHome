import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import doc from '../images/doc.jpg'

 const useStyles = makeStyles(theme => ({
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
      },
      card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
      cardMedia: {
        paddingTop: "56.25%" // 16:9
      },
      cardContent: {
        flexGrow: 1
      },
    }));
    
    export default function DocInfoCard({Name,Speciality,ClinicFee,ida, OnlineFee, SetOnline}) {
      const classes = useStyles();
      
      console.log(ida);
    
      return (
        <React.Fragment>   
                  <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={doc}
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {Name}
                        </Typography>
                        <Typography>Speciality: {Speciality}</Typography>
                        <Typography>ClinicFee: {ClinicFee}</Typography>
                        <Typography>OnlineFee: {OnlineFee}</Typography>
                        <Typography>Appointment</Typography>
                      </CardContent>
                      <CardActions>
                        <Link  style={{textDecoration: 'none'}} to={"ClinicAppointment/" + ida +"/"+ Speciality +"/"+ ClinicFee + "/" + Name}>
                        <Button variant="contained" color="primary">
                          physical 
                        </Button>
                        </Link>
                        {SetOnline ?(
                        <Link style={{textDecoration: 'none'}} to={"OnlineAppointment/" + ida+"/"+ Speciality +"/"+ OnlineFee + "/" + Name}>
                        <Button variant="contained" color="primary">
                          Online 
                        </Button>
                        </Link>
                      ):(
                        <div></div>
                      )}
{/*                       <Button variant="contained" color="primary" href="ClinicAppointment/${id}">
                          physical 
                        </Button>
                        <Button variant="contained" color="primary" href="OnlineAppointment">
                          Online 
                        </Button> */}
                      </CardActions>
                    </Card>
                  </Grid>
        </React.Fragment>
      );
    }