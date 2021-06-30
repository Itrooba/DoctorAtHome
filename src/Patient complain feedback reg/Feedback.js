import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import comp from '../images/comp.jpg';
import Apbar from '../Appbar';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
  image: {
    backgroundImage:   `url(${comp})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Complain() {
  const classes = useStyles();
  const [feedback, setfeedback] = React.useState(null);
  const [name,setname]=React.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault()
    const registerd={
      feedback:feedback,
      name:name
    };
    console.log(JSON.stringify(registerd));
    axios.post('http://localhost:5000/api/auth/feedbackrecord',registerd)
    .then(response => console.log(response.data));
    document.getElementById("form").reset();
  };
  return (
    <>
   <Apbar />
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}   className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Feedback
          </Typography>
          <form id="form" className={classes.form}  onSubmit={handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              onChange={e => setname(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="comp"
              label="Write Feedback"
              name="comp"
              autoComplete="comp"
              multiline
              autoFocus
              onChange={e => setfeedback(e.target.value)}
            />
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
      </Grid>
    </Grid>
    </>
  );
}