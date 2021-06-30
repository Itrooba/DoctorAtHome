import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import RegisterDoctor from './RegisterDoctor';
import ViewAppointments from './Appointments';
import OnlineAppointments from './OnlineAppointments';
import DoctorInfo from './DoctorInfo';
import ViewComplaints from './ViewComplaints';
import ViewFeedback from './ViewFeedback';
import Home from './Home';
import ViewDoctor from './ViewDoctors';
import VerifyPayment from './UserInformation';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';
import {logout } from '../helpers/auth';
import Button from '@material-ui/core/Button';
import { CalendarToday , PersonAdd , Error ,Create, Dashboard }from '@material-ui/icons';
import PersonIcon from '@material-ui/icons/Person';
import ViewListIcon from '@material-ui/icons/ViewList';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        
          <ListItem button onClick={e=>setFragment("Home")}>
            <ListItemIcon> <Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={e=>setFragment("RegisterDoctor")} >
            <ListItemIcon> <PersonAdd /></ListItemIcon>
            <ListItemText primary="Register Doctor" />
          </ListItem>

          <ListItem button onClick={e=>setFragment("doctorInfo")} >
            <ListItemIcon> <PersonIcon /></ListItemIcon>
            <ListItemText primary="Doctor Profile" />
          </ListItem>

          <ListItem button onClick={e=>setFragment("ViewDoctor")} >
            <ListItemIcon> <ViewListIcon /></ListItemIcon>
            <ListItemText primary=" View Doctors" />
          </ListItem>

          <ListItem button onClick={e=>setFragment("Appointments")}>
            <ListItemIcon> <CalendarToday /></ListItemIcon>
            <ListItemText primary="Clinic Appointments" />
          </ListItem>

          <ListItem button onClick={e=>setFragment("OnlineAppointments")}>
            <ListItemIcon> <CalendarToday/></ListItemIcon>
            <ListItemText primary="Online Appointments" />
          </ListItem>

          <ListItem button onClick={e=>setFragment("VerifyPayment")}>
            <ListItemIcon> <PermContactCalendarIcon /></ListItemIcon>
            <ListItemText primary="User Information" />
          </ListItem>

          <ListItem button onClick={e=>setFragment("ViewComplaints")}>
            <ListItemIcon> <Error /></ListItemIcon>
            <ListItemText primary="View Complaints" />
          </ListItem>

          <ListItem button onClick={e=>setFragment("ViewFeedback")}>
            <ListItemIcon> <Create /></ListItemIcon>
            <ListItemText primary="View Feedback" />
          </ListItem>
        
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const [fragment, setFragment] = useState("Home")

  const loadFragment = () =>
  {
      switch (fragment) {
            case "Home":
            return <Home/>

            case "RegisterDoctor":
            return <RegisterDoctor/>

            case "Appointments":
            return <ViewAppointments/>

            case "OnlineAppointments":
              return <OnlineAppointments/>

            case "doctorInfo":
              return <DoctorInfo/>

              case "ViewDoctor":
              return <ViewDoctor/>

            case "VerifyPayment":
            return <VerifyPayment/>

            case "ViewComplaints":
            return <ViewComplaints/>

            case "ViewFeedback":
            return <ViewFeedback/>
              
      
          default:
              break;
      }
  }

  let history = useHistory();
  const handleLogout = (evt) => {
    logout(() => {
        history.push('/login');
    });
};
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" variant="h6" color="inherit">
            Poly Clinic - Admin Panel
          </Link>
          <div className={classes.grow} />
          <div>
          <Button
              id="logout"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
       
            {loadFragment()}
<br/>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  
};

export default ResponsiveDrawer;
