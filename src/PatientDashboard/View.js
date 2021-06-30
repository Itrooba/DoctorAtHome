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
import Header from './Header';
import Doctor from './Doctor';
import { useParams} from 'react-router';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import download from 'downloadjs';
import moment from 'moment';

const headCells = [
  { id: 'sr', numeric: false, disablePadding: true, label: 'Sr No' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Patient Email' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Doctor Name' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'time', numeric: true, disablePadding: false, label: 'Prescription' },
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
          Diagnosis Record
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

export default function Room() {
  /********/
  const {email} = useParams();
  const {doctor} = useParams();
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/auth/getAllFiles/` + doctor +"/" + email);
        setErrorMsg('');
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:5000/api/auth/download/${id}`, {
        responseType: 'blob'
      });
      const split = path.split('/');
      const filename = split[split.length - 1];
      setErrorMsg('');
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg('Error while downloading file. Try again later');
      }
    }
  };
  /****** */
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  return (
    <div>
      <Header />
      <Doctor />
    <Container>
    <div className={classes.root}>
      <Paper className={classes.paper}>
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        <EnhancedTableToolbar  /> 
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
            {filesList.length > 0 ? (
            filesList.map(function(rows, i) {
          return(
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={i}
                    >
                      <TableCell component="th" scope="row" width="100">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left" width="150">{rows.email}</TableCell>
                      <TableCell align="left" width="150">{rows.doctor}</TableCell>
                      <TableCell align="left" width="150">{moment( rows.date).format("MMMM Do YYYY")}</TableCell>
                      <TableCell align="left" width="100"><Button variant="contained"  color="primary" href="#/" onClick={() =>downloadFile(rows._id, rows.file_path, rows.file_mimetype) }>
                      Download
                    </Button></TableCell>
                    </TableRow>
                    )})
            ):(
                <TableRow
                      hover
                      tabIndex={-1}
                    >
                      <TableCell component="th" scope="row" width="100">
                        <Typography> No rows Found</Typography>
                      </TableCell>
                    </TableRow>
            )}
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

