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
import moment from 'moment';

const headCells = [
  { id: 'sr', numeric: false, disablePadding: true, label: 'Sr No' },
  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'complaint', numeric: true, disablePadding: false, label: 'Complaint' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar
      className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Complaints
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
  const getinfo = async()=>{
    const response = await axios.get('http://localhost:5000/api/auth/complainrecord')

    console.log(response.data)
    setdata(response.data);
  }

  useEffect(()=>{
    getinfo();
  }, [])

  const Delete =async (id)=>{
    var answer=window.confirm('Are you sure to Delete this Record?')
    if(answer===true){
      await axios.delete(`http://localhost:5000/api/auth/complainrecord/${id}`)
      .then(()=>{
            getinfo();
      }) }
     
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
                      role="checkbox"
                      tabIndex={-1}
                      key={i}
                    >
                      <TableCell component="th" scope="row"  width="100">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left" width="150">{moment( rows.date).format("MMMM Do YYYY")}</TableCell>
                      <TableCell align="left" width="300">{rows.complain}</TableCell>
                      <TableCell align="left" width="150">{rows.email}</TableCell>
                      <TableCell align="left">{<Button variant="contained" color="primary" onClick={()=>Delete(rows._id) }>Delete</Button>}</TableCell>
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
