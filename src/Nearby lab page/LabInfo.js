import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import lab from '../images/labf.jpg'

   const useStyles = makeStyles(theme => ({
      cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
      },
      card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      },
      cardMedia: {
        paddingTop: "56.25%" // 16:9
      },
      cardContent: {
        flexGrow: 1
      },
     
    }));
    
    const cards = [
      {
        desc: "Jinnah Road",
        heading:"Shafqt Lab"
      },
      {
        
        desc: " Circular Road",
        heading:"Chugtai Lab"
      },
      {
       
        desc: " Shaheen Chowk",
        heading:"Hmeeda Lab"
      },
      {
        desc: "Jial Chowk",
        heading:"Ayesha Lab"
      },
      {
        
        desc: " Bhimber Road",
        heading:"Mirza Lab"
      },
      {
       
        desc: " Marghzar Colony",
        heading:"Jinnah Lab"
      }
    ];
    
    export default function LabInfo() {
      const classes = useStyles();
    
      return (
        <React.Fragment>
            <Container className={classes.cardGrid} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {cards.map(card => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={lab}
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {card.heading}
                        </Typography>
                        
                        <Typography>Address</Typography>
                        <Typography>{card.desc}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          
          
        </React.Fragment>
      );
    }