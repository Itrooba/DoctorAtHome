import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import Appbar from '../Appbar'
import FindDocCard from './FindDocCarad'


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
    
    
    
    export default function Album() {
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
                  Find Doctor
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                   You can find the information of doctor here by searching the doctor.

                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    
                      
              <TextField autoComplete="fname"
                name="Findlab"
                variant="outlined"
                required
                 id="FindLab"
                label="Enter Here"
                autoFocus
              />
              <Button variant="contained" color="primary">
                    Find Doctor
              </Button>
                 </Grid>
                </div>
              </Container>
            </div>
            <FindDocCard/>
          </main>
          
        </React.Fragment>
      );
    }