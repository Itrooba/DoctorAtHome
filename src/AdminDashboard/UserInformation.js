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
import { Divider } from '@material-ui/core';

const headCells = [
  { id: 'sr', numeric: false, disablePadding: true, label: 'Sr No' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'pass', numeric: true, disablePadding: false, label: 'Password' },
  { id: 'cnic', numeric: true, disablePadding: false, label: 'CNIC' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
  { id: 'update', numeric: true, disablePadding: false, label: 'Change Phone' },
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

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    return (
      <Toolbar
        className={classes.root}>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            User Information
          </Typography>
          <Button variant="contained" style={{width: '250px'}} color="primary" onClick={()=>SearchUser() }>
                    Serach User
                </Button>
      </Toolbar>
    );
  };

  /********/
  const [data,setdata] = useState([]);
  const [Search,setSearch]=useState([]);
  const getinfo = async()=>{
    const response = await axios.get('http://localhost:5000/api/auth/user')
    console.log(response.data)
    setdata(response.data);
  }
  useEffect(()=>{
    getinfo();
  }, [])

  const Delete =async (id)=>{
    var answer=window.confirm('Are you sure to Delete this Record?')
    if(answer===true){
      await axios.delete(`http://localhost:5000/api/auth/user/${id}`)
      .then(()=>{
            getinfo();
            SearchUpdate();
      }) }
     
    }
    const UpdatePhone=async (id,oldphone)=>{
    
      const newPhone= prompt("Enter New Phone Number:");
      var phone={}
      if(newPhone===null){
        phone={phone:oldphone}
        alert("Canceled")
      }
      else{
        phone={phone:newPhone}
        alert("Phone is Updated Sucessfully.If You do not see changes please refresh the Page.")
      }
      axios.patch(`http://localhost:5000/api/auth/user/${id}`,phone)
      .then(response => console.log(response.data),getinfo(), SearchUpdate());
      getinfo();
    }
    var name;
    var SearchUser=async ()=>{
      name=prompt("Enter Name Of User:");
     JSON.stringify(name);
     if(name===null){
       alert("Cancel")
     }
     else{
     const response = await axios.get(`http://localhost:5000/api/auth/user/${name}`,{ params: { name }})
     console.log(response.data.phone)
     
     if(response.data.length===0){
       alert("Not Match with any Record. Please Enter correct Name")
       
     } else{
       setSearch(response.data);
     }}
   }
   var SearchUpdate= async ()=>{
    const rep= await axios.get(`http://localhost:5000/api/auth/user/${name}`,{ params: { name }})
     setSearch(rep.data)
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
            <TableBody>
            {Search.map(function(row, i) {
              return(
              <TableRow
              style={{backgroundColor: 'lightyellow'}}
              >
              <TableCell component="th" scope="row" align="center">
                {i + 1}
               </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                 <TableCell align="center">{row.email}</TableCell>
                 <TableCell align="center">{row.cnic}</TableCell>
                 <TableCell align="center">{row.password2}</TableCell>
                 <TableCell align="center">{row.phone}</TableCell>
                 <TableCell> {<Button variant="contained" color="primary" onClick={()=>UpdatePhone(row._id,row.phone) }>Click</Button>}</TableCell>
                  <TableCell align="center">{<Button variant="contained" color="primary" onClick={()=>Delete(row._id) }>Delete</Button>}</TableCell>
                <TableCell align="center">{<Button variant="contained" color="primary" onClick={()=>SearchUpdate() }>Clear</Button>}</TableCell>
              </TableRow>
            )})}
             <Divider />
              {data.map(function(rows, i) {
               return(
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={i}
                    >
                      <TableCell component="th" scope="row"  width="100">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left" width="150">{rows.name}</TableCell>
                      <TableCell align="left" width="300">{rows.email}</TableCell>
                      <TableCell align="left" width="150">{rows.password2}</TableCell>
                      <TableCell align="left" width="150">{rows.cnic}</TableCell>
                      <TableCell align="left" width="150">{rows.phone}</TableCell>
                      <TableCell> {<Button variant="contained" color="primary" onClick={()=>UpdatePhone(rows._id,rows.phone) }>Click</Button>}</TableCell>
                       <TableCell align="center">{<Button variant="contained" color="primary" onClick={()=>Delete(rows._id) }>Delete</Button>}</TableCell>
                      </TableRow>
                       )})}
            </TableBody>
           
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
