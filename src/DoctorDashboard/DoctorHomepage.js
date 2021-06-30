import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Doctor2 from '../images/Doctor2.jpg';
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
        height: '80vh',
        [theme.breakpoints.down('xs')]: {
            height: '100% !important', // Overrides inline-style
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
       // marginTop: 110,
      },

      button:{
        width: 350,
        height: 150,
        marginRight: 40,
      },

      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: theme.spacing(5),
        width: 800,
        [theme.breakpoints.down('xs')]: {
          width: '100% !important', // Overrides inline-style
        },
      },
  }));


function Home() {
//****Backend
const {name} = useParams();
 //******

    const classes = useStyles();
        return (
            <div >
              <Topbar />
               <div className={classes.root}>
                   <img  src ={Doctor2} className={classes.img} alt="logo" />
                   </div> 
  <div className={classes.head}>
  <Typography component="h4" variant="h5" align="center" color="textSecondary" style={{fontFamily:'Segoe UI'}}>
                
            </Typography>
    <Typography
              component="span"
              variant="h5"
              color="inherit"
              className={classes.controls}
            >
              {name}
              <br />
              We care about our users that's why we keep track of your schedule. 
              You can view all your appointments here and can facilitate your patients even from home as DAH has digitalized your meetings. 
        </Typography>
    </div>
    <div className={classes.head}>
<span className={classes.image}>

<Button variant="contained" color="secondary" href={"/onclinic/" + name} className={classes.button} >
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