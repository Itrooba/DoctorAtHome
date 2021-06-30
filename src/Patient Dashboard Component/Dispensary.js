import React, { useState, useRef }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Apbar from '../Appbar';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
        marginTop: '20px',
      },
      uploadsection: {
        display: 'flex',
        height: '200px',
        marginBottom: '10px',
        width: '200px',
      },
      imagepreview:{
          height: '300px',
          width: '300px',
      }
  }));

  function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[0-9]/, /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
        required
      />
    );
  }
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };
export default function RegisterDoctor() {
  // backend connect  
  const [name, setname] = useState(null);
  const [days, setdays] = React.useState(null);
  const [address, setaddress] = React.useState(null);
   const [phone, setphone] = React.useState(null);
   const [status] = React.useState("Pending");
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
     // const { email, doctor } = state;
      if (name.trim() !== '' && days.trim() !== '' && address.trim() !== '' && phone.trim() !== '' && status.trim() !== '') {
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('name', name);
          formData.append('days', days);
          formData.append('address', address);
          formData.append('phone', phone);
          formData.append('status', "Pending");
          setErrorMsg('');
          await axios.post('http://localhost:5000/api/auth/uploadss', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setSuccessMsg('Prescription Uploaded Successfully')
          document.getElementById("form").reset();
        } else {
          setErrorMsg('Please select a file to add.');
        }
      } else {
        setErrorMsg('Please enter all the field values.');
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

//backend end

    const classes = useStyles();
  return (
      <div>
    <Apbar />
      <Container component="main" maxWidth="md">
    <Paper className={classes.paper} elevation={14}>
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Prescription Here
      </Typography>
      <form id="form" className={classes.form} onSubmit={handleOnSubmit} >
      <div className='col-md-5 mx-auto align-self-center'>
                    {successMsg && <p style={{color:"red" , fontSize: "20px"}}>{successMsg}</p>}
                    {errorMsg && <p style={{color:"red" , fontSize: "20px"}}>{errorMsg}</p>}
                    </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Name"
            name="name"
            label="Name"
            onChange={e => setname(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="days"
            type="number"
            name="days"
            label="Days"
            onChange={e => setdays(e.target.value)}
            fullWidth
          />
        </Grid>
       <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            onChange={e => setaddress(e.target.value)}
            fullWidth
          />
        </Grid> 
        <Grid item xs={12} sm={6}>
        {/*   <TextField
        required
        label="Phone Number"
        name="phone"
        onChange={e => setphone(e.target.value)}
        id="phone"
        InputProps={{
          inputComponent: TextMaskCustom,
        }}
      />   */}
       <TextField
            required
            id="phone"
            name="phone"
            label="Phone Number"
            onChange={e => setphone(e.target.value)}
            fullWidth
          /> 
        
        </Grid>
        <Grid item xs={12} sm={6}>
        <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder('over')}
            onDragLeave={() => updateBorder('leave')}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop a file OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
        </Grid>
        <Grid item xs={12} sm={6}>
        {previewSrc ? (
            isPreviewAvailable ? (
              <div className={classes.imagepreview}>
                <img className={classes.imagepreview} src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
            <Button size="large" style={{marginRight: '5px'}} variant="contained" color="primary" type="submit">
                SUBMIT
            </Button>
            <Button size="large" variant="contained" color="primary" href="/">
                CANCEL
            </Button>
        </Grid>
      </Grid>
      </form>
     <br /> <br /> <Typography variant="h6" gutterBottom>
        Instructions:
        Enter the number of days according to your requirement of the medicine.
        We will respond to you within 3 days. 
        The payment mode is cash on delivery.
      </Typography>
    </React.Fragment>
    </Paper>
    </Container>
    </div>
  )
}