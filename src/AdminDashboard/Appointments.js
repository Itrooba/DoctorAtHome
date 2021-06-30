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

const headCells = [
  { id: 'sr', numeric: false, disablePadding: false, label: 'Sr No' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'paient', numeric: true, disablePadding: false, label: 'Patient Name' },
  { id: 'doc', numeric: true, disablePadding: false, label: 'Doctor Name' },
  { id: 'svc', numeric: true, disablePadding: false, label: 'Service' },
  { id: 'tm', numeric: true, disablePadding: false, label: 'Time' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'ph', numeric: true, disablePadding: false, label: 'Phone Number' },
  { id: 'sts', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'delete', numeric: true, disablePadding: false, label: 'Delete' },
  { id: 'delete', numeric: true, disablePadding: false, label: 'Set Status' },
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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar
      className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Clinic Appointments
        </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    height: 500,
    flexGrow: 1,
    flexDirection: 'column',
    paddingTop: 10,
    alignItems: 'left',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
   // marginLeft: 100,
   // marginRight: 100,
  },
  table: {
    minWidth: 650,
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
  const getinfo = async()=>{
    const response = await axios.get('http://localhost:5000/api/auth/appointment')
    console.log(response.data)
    setdata(response.data);
  }

  useEffect(()=>{
    getinfo();
  }, [])

  const Delete =async (id)=>{
    var answer=window.confirm('Are you sure to Delete this Record?')
    if(answer===true){
      await axios.delete(`http://localhost:5000/api/auth/appointment/${id}`)
      .then(()=>{
            getinfo();
      }) }
     
    }

    const SetStatus=async (id)=>{
    
      const newstatus= prompt("Enter Status:");
      var Status={}
        if(newstatus===null){
          Status={
              status:""
                  }
                  alert("Cancelled")
        }
        else{
          Status={Status:newstatus}
          alert("Status Update")
        }
        axios.patch(`http://localhost:5000/api/auth/appointment/${id}`,Status)
        .then(response => console.log(response.data), getinfo());
       
      }

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
      
        <EnhancedTableToolbar />
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
                      tabIndex={-1}
                      key={i}
                    >
                      <TableCell component="th" scope="row"  width="100">
                        {i + 1}
                      </TableCell>
                        <TableCell align="left" width="300px">{rows.AppDate}</TableCell>
                        <TableCell align="left" width="200">{rows.Name}</TableCell>
                        <TableCell align="left" width="200">{rows.doc_id}</TableCell>
                        <TableCell align="left" width="200">{rows.Service}</TableCell>
                        <TableCell align="left" width="200">{rows.Time}</TableCell>
                        <TableCell align="left" width="200">{rows.Email}</TableCell>
                        <TableCell align="left" width="200">{rows.mobile_no}</TableCell>
                        <TableCell align="left" width="200">{rows.Status}</TableCell>
                      <TableCell align="left">{<Button variant="contained" color="primary" onClick={()=>Delete(rows._id) }>Delete</Button>}</TableCell>
                      <TableCell align="center"> {<Button variant="contained" color="primary" onClick={()=>SetStatus(rows._id) }>Update</Button>}</TableCell>
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
