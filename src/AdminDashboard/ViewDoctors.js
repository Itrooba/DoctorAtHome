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
  { id: 'date', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'complaint', numeric: true, disablePadding: false, label: 'Speciality' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Clinic Fee' },
  { id: 'fee', numeric: true, disablePadding: false, label: 'Online Fee' },
  { id: 'onl', numeric: true, disablePadding: false, label: 'Set Online' },
  { id: 'book', numeric: true, disablePadding: false, label: 'Booking Time' },
  { id: 'delete', numeric: true, disablePadding: false, label: 'Delete' },
  { id: 'update', numeric: true, disablePadding: false, label: 'Update Fee' },
  { id: 'upd', numeric: true, disablePadding: false, label: 'Update Fee' },
  { id: 'svc', numeric: true, disablePadding: false, label: 'Online Service' },
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
            Doctors
          </Typography>
          <Button variant="contained" style={{width: '250px'}} color="primary" onClick={()=>SearchDoctor() }>
                  Serach Doctor
              </Button>
      </Toolbar>
    );
  };

  /********/
  const [data,setdata] = useState([]);
  const [Search,setSearch]=useState([]);
  const getinfo = async()=>{
    const response = await axios.get('http://localhost:5000/api/auth/doctor')

    console.log(response.data)
    setdata(response.data);
  }

  useEffect(()=>{
    getinfo();
  }, [])

  const Delete =async (id)=>{
    var answer=window.confirm('Are you sure to Delete this Record?')
    if(answer===true){
      await axios.delete(`http://localhost:5000/api/auth/doctor/${id}`)
      .then(()=>{
            getinfo();
            SearchUpdate();
      }) }
    }

    const UpdateOnlineFee=async (id,preonlinefee)=>{
    
        const newonlinefee= prompt("Enter New Online Fee:",preonlinefee);
        var onlinefee={}
          if(newonlinefee===null){
            onlinefee={
                OnlineFee:preonlinefee
                    }
                    alert("Cancelled")
          }
          else{
            onlinefee={OnlineFee:newonlinefee}
            alert("Online Fee is Updated successfully.If you dont see changes please refresh the page.")
          }

        axios.patch(`http://localhost:5000/api/auth/doctor/${id}`,onlinefee)
        .then(response => console.log(response.data),getinfo(),SearchUpdate());
       getinfo();
      }
    
      const UpdateOnclinicFee=async (id,preonclinicfee)=>{
        
        const newonclinicfee= prompt("Enter New Onclinic Fee:",preonclinicfee);
        var onclinicfee={}
        if(newonclinicfee===null){
          onclinicfee={ClinicFee:preonclinicfee}
          alert("Canceled")
        }
        else{
          onclinicfee={ClinicFee:newonclinicfee}
          alert("Onclinic Fee is Updated Sucessfully.If You do not see changes please refresh the Page.")
        }
        axios.patch(`http://localhost:5000/api/auth/doctor/${id}`,onclinicfee)
        .then(response => console.log(response.data),getinfo(), SearchUpdate() );
       getinfo();
      }
    
      const UpdateSetOnline=async (id,preonclinicfee)=>{
        
        const newonclinicfee= prompt("Enter 1 to Set Online Service and Remove 1 to cancel the Online Service:",preonclinicfee);
        var onclinicfee={}
        if(newonclinicfee===null){
          onclinicfee={SetOnline:preonclinicfee}
          alert("Canceled")
        }
        else{
          onclinicfee={SetOnline:newonclinicfee}
          alert("Updated Sucessfully.If You do not see changes please refresh the Page.")
        }
        axios.patch(`http://localhost:5000/api/auth/doctor/${id}`,onclinicfee)
        .then(response => console.log(response.data),getinfo(), SearchUpdate() );
        getinfo();
      }
var Name;
      var SearchDoctor=async ()=>{
        Name=prompt("Enter Name Of Doctor:");
       JSON.stringify(Name);
       if(Name===null){
         alert("Cancel")
       }
       else{
       const response = await axios.get(`http://localhost:5000/api/auth/search/${Name}`,{ params: { Name }})
       console.log(response.data.phone)
       
       if(response.data.length===0){
         alert("Not Match with any Record. Please Enter correct Name")
         
       } else{
        
         setSearch(response.data);
         
       }}
     }
     var SearchUpdate= async ()=>{
      const rep= await axios.get(`http://localhost:5000/api/auth/search/${Name}`,{ params: { Name }})
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
              {Search.map(function(row, i){
                return(
                  <TableRow
                  style={{backgroundColor: 'lightyellow'}}
                    >
                      <TableCell component="th" scope="row"  width="100">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left" width="150">{row.Name}</TableCell>
                      <TableCell align="left" width="150">{row.Speciality}</TableCell>
                      <TableCell align="left" width="150">{row.ClinicFee}</TableCell>
                      <TableCell align="left" width="150">{row.OnlineFee}</TableCell>
                      <TableCell align="left" width="50">{row.SetOnline}</TableCell>
                      <TableCell width="200"> {<Button variant="contained" color="primary" href={"/booking/" + row.Name + "/" + row.SetOnline}>View</Button>}</TableCell>
                      <TableCell align="left" width="150">{<Button variant="contained" color="primary" onClick={()=>Delete(row._id) }>Delete</Button>}</TableCell>
                      <TableCell width="300"> {<Button variant="contained" style={{width: '150px'}} color="primary" onClick={()=>UpdateOnlineFee(row._id,row.OnlineFee) }>Online Fee</Button>}</TableCell>
                       <TableCell > {<Button variant="contained" color="primary" style={{width: '150px'}} onClick={()=>UpdateOnclinicFee(row._id,row.ClinicFee) }>Clinic Fee</Button>}</TableCell>
                       <TableCell > {<Button variant="contained" color="primary" style={{width: '150px'}} onClick={()=>UpdateSetOnline(row._id,row.SetOnline) }>Set Online</Button>}</TableCell>
                      </TableRow>
                )
              })}
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
                      <TableCell align="left" width="150">{rows.Name}</TableCell>
                      <TableCell align="left" width="150">{rows.Speciality}</TableCell>
                      <TableCell align="left" width="150">{rows.ClinicFee}</TableCell>
                      <TableCell align="left" width="150">{rows.OnlineFee}</TableCell>
                      <TableCell align="left" width="50">{rows.SetOnline}</TableCell>
                      <TableCell width="200"> {<Button variant="contained" color="primary" href={"/booking/" + rows.Name + "/" + rows.SetOnline}>View</Button>}</TableCell>
                      <TableCell align="left" width="150">{<Button variant="contained" color="primary" onClick={()=>Delete(rows._id) }>Delete</Button>}</TableCell>
                      <TableCell width="300"> {<Button variant="contained" style={{width: '150px'}} color="primary" onClick={()=>UpdateOnlineFee(rows._id,rows.OnlineFee) }>Online Fee</Button>}</TableCell>
                       <TableCell > {<Button variant="contained" color="primary" style={{width: '150px'}} onClick={()=>UpdateOnclinicFee(rows._id,rows.ClinicFee) }>Clinic Fee</Button>}</TableCell>
                       <TableCell > {<Button variant="contained" color="primary" style={{width: '150px'}} onClick={()=>UpdateSetOnline(rows._id,rows.SetOnline) }>Set Online</Button>}</TableCell>
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
