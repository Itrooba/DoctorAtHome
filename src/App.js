import './App.css';
import React, {Component} from 'react';
import Signin from './Login/Signin';
import DispensaryHomepage from './DispensaryDashboard/DispensaryHomepage';
import Dashboard from './DispensaryDashboard/Dashboard';
import DoctorHomepage from './DoctorDashboard/DoctorHomepage';
import OnClinic from './DoctorDashboard/OnClinic';
import Online from './DoctorDashboard/Online';
import FindDoc from './DoctorInformation/FindDoc'
import Registration from './Patient complain feedback reg/RegistrationForm'
import Feedback from "./Patient complain feedback reg/Feedback"
import Complain from "./Patient complain feedback reg/Complain"
import Docinfo from './DoctorInformation/DocInfo'
import PatientDash from './Patient Dashboard Component/PatientDash'
import Nearbylab from './Nearby lab page/Nearbylab'
import OnlineConsultation from './OnlineConsultation Page/OnlineConsultation';
import ClinicAppointment from './Appointment/ClinicAppointment';
import OnlineAppointment from './Appointment/OnlineAppointment';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import Payment from './Appointment/Payment';
import Map from './Nearby lab page/Map';
import RegisterDoctor from './AdminDashboard/RegisterDoctor';
import Diagnosis from './OnlineConsultation Page/Diagnosis';
import { Switch, Route } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import DoctorRoute from './DoctorRoute';
import DoctorInfo from './AdminDashboard/DoctorInfo';
import DispenserRoute from './DispenserRoute';
import PatientHome from './PatientDashboard/PatientHome';
import PatientRoute from './PatientRoutes';
import OnClinicApp from './PatientDashboard/OnClinicApp';
import OnlineApp from './PatientDashboard/OnlineApp';
import Call from './DoctorDashboard/Call';
import Room from './PatientDashboard/Room';
import PatientCall from './PatientDashboard/PatientCall';
import View from './PatientDashboard/View';
import Diagnos from './DoctorDashboard/Diagnosis';
import DiagnosisRecord from './DoctorDashboard/DiagnosisRecord';
import Booking from './AdminDashboard/Booking';
import OnlineBooking from './AdminDashboard/OnlineBooking';
import Dispensary from './Patient Dashboard Component/Dispensary';
class App extends Component {
  render(){
  return (
    <>
    <Switch>
                <Route exact path="/" component={PatientDash} />
                <PatientRoute exact path="/patientHome/:name/:email" component={PatientHome} />
                <PatientRoute exact path="/onclinicapp/:name/:email" component={OnClinicApp} />
                <PatientRoute exact path="/onlineapp/:name/:email" component={OnlineApp} />
                <PatientRoute exact path="/room/:name/:email/:doctor" component={Room} />
                <PatientRoute exact path="/patientcall/:name/:id" component={PatientCall} />
                <Route path="/onlineconsultation" component={OnlineConsultation} />
                <Route path="/finddoc" component={FindDoc} />
                <Route path="/docinfo" component={Docinfo} />
                <Route path="/registrationform" component={Registration} />
                <Route path="/feedback" component={Feedback} />
                <PatientRoute exact path="/complain/:email" component={Complain} />
                <Route path="/nearbylab" component={Nearbylab} />
                <Route path="/map" component={Map} />
                <Route path="/payment" component={Payment} />
                <Route path="/uploadPrescription" component={Dispensary} />
                <Route path="/ClinicAppointment/:id/:type/:ClinicFee/:doc" component={ClinicAppointment} />
                <Route path="/OnlineAppointment/:id/:type/:OnlineFee/:doc" component={OnlineAppointment} />
                <Route exact path="/login" component={Signin} />
                <AdminRoute exact path="/signup" component={RegisterDoctor} />
                <AdminRoute exact path="/adminDashboard" component={AdminDashboard} />
                <AdminRoute exact path="/doctorInfo" component={DoctorInfo} />
                <AdminRoute exact path="/booking/:name/:online" component={Booking} />
                <AdminRoute exact path="/onlinebooking/:name" component={OnlineBooking} />
                <DispenserRoute exact path="/dispensaryHome/:name" component={DispensaryHomepage} />
                <DispenserRoute exact path="/dispensary/:name" component={Dashboard} />
                <Route exact path="/diagnosisRecord" component={Diagnosis} />
                <DoctorRoute exact path="/diagnosis/:email/:name" component={Diagnos} />
                <DoctorRoute exact path="/doctorHome/:name" component={DoctorHomepage} />
                <DoctorRoute exact path="/onclinic/:name" component={OnClinic} />
                <DoctorRoute exact path="/diagnosisRecords/:name/:email" component={DiagnosisRecord} />
                <DoctorRoute exact path="/online/:name" component={Online} />
                <PatientRoute exact path="/view/:name/:email/:doctor" component={View} />
                <Route exact path="/call/:email/:name" component={Call} />
    </Switch>
    </>
  );
  }
}

    export default App;