import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DocCard from './DocCard'
import TextField from '@material-ui/core/TextField';
import Appbar from '../Appbar';
import axios from 'axios';
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
    
    
    export default function DocInfo() {
      const [data,setdata] = useState([]);
      const [doc, setdoc] = useState('');
      const classes = useStyles();

      const getinfo = async()=>{
        console.log("CommingIN");
        // Make a request for a user with a given ID
        await axios.get('http://localhost:5000/api/auth/DoctorsInfo/')
        .then(function (response) {
          // handle success
          console.log(response);
          setdata(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      }
      const search_doc =()=>{
        var df = [];
        
        console.log(doc);
        const de = [...data];
       
        de.forEach(element => {
          if (element.Speciality === doc) {
            df.push({Name: element.Name,Speciality: element.Speciality,ClinicFee: element.ClinicFee,OnlineFee: element.OnlineFee,_id:element._id, SetOnline: element.SetOnline})
            
          }
        
        });
        
        if(df.length===0){
        alert(" Record not Found")
          
        }
        else{
  setdata(df);
} 
        
      }
      useEffect(()=>{
        getinfo();
      },[])
    
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
                  Doctor's Information
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  Here is the information of Doctrs that are working in Poly Clinic. All the Doctors are well 
              experienced and qualified.You can also take appointment of the doctors.
              <br /> Send Your Fee For Online Consultation at Account Number: 9756432765124
              <br /> For EasyPaisa: 03344487449
              <br /> You have to give Information about Fee Submittion First, to Book appointment
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                  <TextField autoComplete="fname"
                value={doc}
                onChange={(event) => {setdoc(event.target.value)}}
                name="Serachlab"
                variant="outlined"
                required
                id="searchLab"
                label="Enter Speciality"
                autoFocus
              />
              <Button onClick={()=>{search_doc()}} variant="contained" color="primary">
                        Search Doctor
                      </Button>
                  </Grid>
                </div>
              </Container>
            </div>
          </main>
          <Grid md={10} container spacing={6} justify="center" style={{margin:'auto'}}>
            {data.map(function(element, i) {
                return (
                  <DocCard key={i} Name={element.Name} Speciality={element.Speciality} ClinicFee={element.ClinicFee} OnlineFee={element.OnlineFee} ida={element._id} SetOnline={element.SetOnline} />
                );
              })}
            </Grid>
        </React.Fragment>
      );
    }