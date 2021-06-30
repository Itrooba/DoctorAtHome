import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import medical from '../images/medical.jpg';
import Button from '@material-ui/core/Button';
import Topbar from '../Login/Topbar';
import { useParams} from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: 200,
        flexGrow: 1,
        flexDirection: 'column',
        width: '100%',
    },
    img: {
        height: '100vh',
        [theme.breakpoints.down('xs')]: {
            height: '100vh !important', // Overrides inline-style
          },
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
        opacity: 0.25,
    },
    image: {
        position: 'relative',
        height: 130,
        [theme.breakpoints.down('xs')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
        },
        '&:hover, &$focusVisible': {
          zIndex: 1,
          '& $imageMarked': {
            opacity: 0,
          },
        },
      },
      focusVisible: {},
      imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
        width: 'auto',
      },
      imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
      },
      head:{
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        position: 'static',
        marginLeft: "5%",
       // marginBottom: 40,
       // marginTop: 110,
      },

      button:{
        width: 350,
        height: 150,
       // marginBottom: 40,
      },

      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: theme.spacing(5),
        width: 500,
        [theme.breakpoints.down('xs')]: {
          width: '100% !important', // Overrides inline-style
        },
      },
  }));


function Home() {
//****Backend
const {name} = useParams();
const {email} = useParams();
 //******

    const classes = useStyles();
        return (
            <div >
              <Topbar />
               <div className={classes.root}>
                   <img  src ={medical} className={classes.img} alt="logo" />
                   </div> 
  <div className={classes.head}>
    <Typography
            fontFamily ="Segoe UI"
            fontWeight="Bold"
              component="span"
              variant="h5"
              color="inherit"
              className={classes.controls}
            >
              {name}
              <br />
              We care about our users that's why we keep track of your schedule. 
              You can view all your appointments here and can consult with Doctors even from home as DAH has digitalized your meetings. 
        </Typography>
    </div>
    <div className={classes.head}>
<span className={classes.image}>

<Button variant="contained" color="secondary" href={"/onclinicapp/"  + name + "/" + email} className={classes.button} >
<Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              Go to Dashboard
              <span className={classes.imageMarked} />
            </Typography>
</Button>
</span>
    </div>
        </div>
        )
}

export default Home;