import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';




export default function Main(props) {
  
  const {title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <br />
    <Typography varient="subtitle1" gutterBottom align="justify">
    Poly Clinic Hospital provide online platform for taking appointments physical as well as for online checkups.
     Using this platform patient can attend online checkup meetings and can buy the online medicines. In this way,
      hospital reduce the traffic of people in the building.Patient can also get information about the nearby laboratories.
      It is prefer for new patients to register themeselves. The feed back of the patient is important for the Hospital.
      Dr. Tahir Rasheed Sb (General surgeon) , Dr. Samina Tahir , Dr. Uzma Yahya (Gynachologist ) and other 
      qualified doctors treat the patients with care and affection.
    </Typography>
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};