import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Instagram from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Content from './Main';
import Sidebar from './Sidebar';

import mainimg from '../images/maing.jpg';


const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Appointment', url: 'docinfo' },
 // { title: 'Doctor information', url: 'docinfo' },
  { title: 'Laboratories', url: 'map' },
  {title:'Online Pharmacy', url: 'uploadPrescription'},
  { title: 'Feedback', url: 'feedback' },
 // { title: 'Complain', url: 'complain' },
 
];

const mainFeaturedPost = {
  title: '  Poly Clinic Hospital',
  description:
    "Marghzar colony Bhimber road Gujrat, Punjab, Pakistan. Hospital has qualified and experience Doctors as well as staff. Phone no. (053) 3606615",
  image: `url(${mainimg})`,
  imgText: 'main image description',
  
};

const featuredPosts = [
  {
    title: 'Appointment',
    description:
      'You can find doctor here and take their appointment .',
    imageText: 'Image Text',
    link:'docinfo'
  },
  {
    title: 'Labs Near Hospital',
    description:
      'You can find a lab here which is near to your location',
      link :'map',
    imageText: 'Image Text',
  },
  {
    title: 'Online Pharmecy',
    description:
      'You can order medicine here by uploading prescription',
     imageText: 'Image Text',
     link :'uploadPrescription'
  },
  {
    title: 'Online Checkup',
    description:
      'You must be registered to Consult Online',
     imageText: 'Image Text',
     link: 'onlineconsultation'
  },
];


const sidebar = {
  title: 'Covid-19 Information',
  description:
    'COVID-19 affects different people in different ways. Most infected people will develop mild to moderate illness.Most common symptoms:fever, dry, cough, tiredness.',
   
  social: [
    { name: 'Instagram', icon: Instagram },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export default function Patient() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
    
        <Header title="DOCTOR AT HOME" sections={sections} />
        
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
         
         
          <Grid container spacing={5} className={classes.mainGrid}>
            <Content title="Poly Clinic Information"  />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
     
    </React.Fragment>
  );
}