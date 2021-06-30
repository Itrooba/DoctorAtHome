import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import patient3 from '../images/patient3.png';
import { useParams} from 'react-router';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
  },
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.dark,
    height: 'auto',
    marginRight: 40,
  },
  details: {
    display: 'flex',
    color: 'white',
   // flexDirection: 'row',
  },
  content: {
    flex: '1 0 ',
    width: "100%",
    color: 'white',
    paddingLeft: theme.spacing(3),
  },
  cover: {
    display: 'flex',
    width: 251,
    height: 250,
    marginTop: theme.spacing(2),
   [theme.breakpoints.down('xs')]: {
    width: '100% !important', // Overrides inline-style
  },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    width: 900,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
    },
  },
  subtitle: {
    color: 'red',
  },
  head:{
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginLeft: "5%",
    marginTop: 15,
    position: 'relative',
  },
  btn:{
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginLeft: "15%",
    marginTop: 5,
    position: 'relative',
  },
  button:{
    width: 300,
    height: 80,
    marginRight: 15,
    marginTop: 5,
  },
}));

export default function Doctor() {
  const classes = useStyles();
  const {name} = useParams();
  return (
    <div >
      <div className={classes.head}>
        <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Hello {name} 
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Welcome to Doctor at Home
          </Typography>
          <Typography className={classes.controls}>
            We care about our users that's why we keep trak of your schedule. You can view all your appointments here and can Consult with Doctors even from home as DaH have digitalized your meetings. 
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={patient3}
        title="Live from space album cover"
      />
    </Card>
      </div>

    </div>
  );
}
