import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import LabelBottomNavigation from './Location'
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import Appbar from '../Appbar'
import LabInfo from './LabInfo'

    const useStyles = makeStyles(theme => ({
      icon: {
        marginRight: theme.spacing(2)
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
      },
      heroButtons: {
        marginTop: theme.spacing(4)
      },
      
    }));
    
    
    export default function Nearbylab() {
      const classes = useStyles();
    
      return (
        <React.Fragment>
          <CssBaseline />
         <Appbar />
          <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  Labortary Information
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  You can find the labortary which is near to you. Please put on your gps to identify your location.
                  Youn can also put your address in the search bar for the search of labortatory.
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                 <LabelBottomNavigation />
                 <br />
                 <br />
                 <br />   <br />
                 
              <TextField autoComplete="fname"
                name="Serachlab"
                variant="outlined"
                required
                 id="searchLab"
                label="Enter Address"
                autoFocus
              />
              <Button variant="contained" color="primary">
                  Serach Lab
              </Button>
                 </Grid>
                </div>
              </Container>
            </div>
            <LabInfo />
          </main>
          
        </React.Fragment>
      );
    }