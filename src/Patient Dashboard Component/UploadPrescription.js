import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Apbar from '../Appbar';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UploadPrescrition() {
  const classes = useStyles();
  const [fname, setFname] = React.useState(null);
  const [days, setdays] = React.useState(null);
  const [adress, setadress] = React.useState(null);
   const [mobilephone, setMobilePhone] = React.useState(null);
  const [filename, setfilename] = React.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(" Presciption is uploaded Successfully")
   const formdata=new FormData();
   formdata.append("name",fname);
   formdata.append("days",days);
   formdata.append("adress",adress);
   formdata.append("phonenumber",mobilephone);
   formdata.append("orderImage",filename);
    console.log(JSON.stringify(formdata));
    axios.post('http://localhost:5000/api/auth/order',formdata)
    .then(response => console.log(response.data));
    document.getElementById("form").reset();
  };
  return (
    <>
    <Apbar></Apbar>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Enter Detail
        </Typography>
        <form id="form" className={classes.form}
          onSubmit={handleSubmit}
          >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label=" Name"
                onChange={e => setFname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="day"
                  label="Days "
                  name="day"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 14 } }}
                  autoComplete="day"
                  onChange={e => setdays(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  onChange={e => setadress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="number"
                  id="phone"
                  autoComplete="phone"
                  onChange={e => setMobilePhone(e.target.value)}
              />
              <br></br>
              <br></br>
          <Typography component="h3" variant="h6">
             Only  Images(.jpg,.png,.jpeg) accept.
        </Typography>
            </Grid>
            <Grid item xs={12}>
            <input
            accept="image/x-png,image/gif,image/jpeg"
            required
            id="contained-button-file"
            multiple
            type="file"
            filename="orderImage"
            style={{marginTop: 40, fontSize: 20}}
            enctype="multipart/form-data" 
            onChange={e => setfilename(e.target.files[0])}
           
          />
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            submit
          </Button>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
    </>
  );
}