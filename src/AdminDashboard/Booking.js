import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';


const headCells = [
  { id: 'sr', numeric: false, disablePadding: true, label: 'Sr No' },
  { id: 'date', numeric: false, disablePadding: true, label: 'Doctor Name' },
  { id: 'complaint', numeric: true, disablePadding: false, label: 'Time' },
  { id: 'delete', numeric: true, disablePadding: false, label: 'Delete' },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow  style= {{ backgroundColor: '#003399', color: 'white', fontSize: 'large' }}>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            <TableSortLabel>
                <span style= {{ color: 'white', fontSize: 'large' , marginLeft: '10px' }}>
              {headCell.label} </span>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginRight: 20,
    marginLeft: 20,
  },
  title: {
    flex: '1 1 100%',
    alignItems: 'center',
  },
}));


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    height: 500,
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 40,
    alignItems: 'left',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
   // marginLeft: 100,
   // marginRight: 100,
  },
  table: {
    minWidth: 550,
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    padding: 40,
  },
  btn:{
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    marginLeft: "25%",
    marginTop: 15,
    position: 'relative',
  },
  button:{
    width: 300,
    height: 80,
    marginRight: 25,
  },
}));

export default function ViewComplaints() {
  /********/
  const [data,setdata] = useState([]);
  const {name} = useParams();
  const getinfo = async()=>{
    const response = await axios.get('http://localhost:5000/api/auth/BookingTime/' + name)
    console.log(response.data)
    setdata(response.data);
  }

  useEffect(()=>{
    getinfo();
  }, [])

  const Delete =async (id)=>{
    var answer=window.confirm('Are you sure to Delete this Record?')
    if(answer===true){
      await axios.delete(`http://localhost:5000/api/auth/booking/${id}`)
      .then(()=>{
            getinfo();
      }) }
     
    }

    const EnhancedTableToolbar = () => {
      const classes = useToolbarStyles();
      const [open, setOpen] = React.useState(false);
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const [Time, setTime] = useState('');
      const {name} = useParams();
      const [errorMsg, setErrorMsg] = useState('');
      const AddNew = (evt) => {
        evt.preventDefault();
        const registerd={
          doc_id: name,
          Time: Time,
        };
        console.log(JSON.stringify(registerd));
        axios.post('http://localhost:5000/api/auth/BookingTime',registerd)
        .then((response )=> {
            if (response.status === 200) {
                setErrorMsg("Done")
              } 
              else{
              setErrorMsg("Booking Time already exist")
               console.log("Error");
              }
        console.log(response.data)
        handleClose();
        getinfo();
        }).catch((error)=> {
            error.response && setErrorMsg(error.response.data);
        })
      }
      return (
        <Toolbar
          className={classes.root}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Booking Time
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen} style={{width: '150px'}} >Add New</Button>
            <Button variant="contained" color="primary" href={"/onlinebooking/" + name } style={{width: '350px', marginLeft: '5px'}} >Online Booking times</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Booking Time</DialogTitle>
            <DialogContent>
              <DialogContentText>
              <div className='col-md-5 mx-auto align-self-center'>
                        {errorMsg && <p style={{color:"red" , fontSize: "20px"}}>{errorMsg}</p>}
                        </div>
                Insert new Time 
              </DialogContentText>
              <TextField
            id="time"
            required
            label="Set Time"
            type="time"
          //  value= {Time}
            name="Time"
            className={classes.textField}
            onChange={e => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={AddNew} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      );
    };
    

  /****** */
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  
  return (
    <div>
        <Container maxWidth="md" fixed>
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={14}>
      
        <EnhancedTableToolbar>
            </EnhancedTableToolbar>
        <TableContainer>

          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
            />
          {data.map(function(rows, i) {
          return(
            <TableBody>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={i}
                    >
                      <TableCell component="th" scope="row"  width="100">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left" width="150">{rows.doc_id}</TableCell>
                      <TableCell align="left" width="150">{rows.Time}</TableCell>
                      <TableCell align="left" width="150">{<Button variant="contained" color="primary" onClick={()=>Delete(rows._id) }>Delete</Button>}</TableCell>
                      </TableRow>
            </TableBody>
            )})}
          </Table>
        
        </TableContainer> 
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
    </Container>
    </div>
    
  );
}
