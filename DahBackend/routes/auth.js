const express = require('express');
const router = express.Router();
const BookingTime = require("../models/Booking_time");
const DoctorsInfo =require("../models/DoctorsInfo");
const Appointment =require("../models/Appointment");
const OnlineBookingTime = require("../models/OnlineBookingTime");
const OnlineAppointmentTemplateCopy = require("../models/OnlineAppointment");
const OnlineAppointment =require("../models/OnlineAppointment");
const OnlineConsultation =require("../models/OnlineConsultation");
const complainrecord=require("../models/ComplainRecordModel");
const feedbackrecord =require('../models/FeedbackRecord');
const Diagnosis =require('../models/Diagnosis');
const Dispensary =require('../models/Dispensary');
const {
    signupValidator,
    signinValidator,
    validatorResult,
} = require('../middleware/validator');
const { signupController, signinController } = require('../controllers/auth');
const { doctorController } = require('../controllers/DoctorInfo');
const User = require('../models/User');
router.post('/signup', signupValidator, validatorResult, signupController);
router.post('/signin', signinValidator, validatorResult, signinController);
router.post('/doctorInfo', doctorController);
const multer=require('multer');
const path = require('path');

//************DIAGNOSIS ROUTES */
const uploads = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});
//*****Post */
router.post('/upload',uploads.single('file'),
  async (req, res) => {
    try {
      const { email, doctor } = req.body;
      const { path, mimetype } = req.file;
      const file = new Diagnosis({
        email,
        doctor,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      console.log(error)
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

router.get('/getAllFiles/:doctor/:email', async (req, res) => {
  try {
    const files = await Diagnosis.find({email: req.params.email, doctor: req.params.doctor});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

router.get('/download/:id', async (req, res) => {
  try {
    const file = await Diagnosis.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});
//********** */
//********Dispenser Routes Test************************************** */

const uploadss = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './dispensery');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});
//*****Post */
router.post('/uploadss',uploadss.single('file'),
  async (req, res) => {
    try {
      const { name, days, address, phone, status } = req.body;
      const { path, mimetype } = req.file;
      const file = new Dispensary({
        name,
        days,
        address,
        phone,
        status,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      res.send('file uploaded successfully.');
    } catch (error) {
      console.log(error)
      res.status(400).send('Error while uploading file. Please try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

router.get('/getAllFiless', async (req, res) => {
  try {
    const files = await Dispensary.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

router.get('/downloads/:id', async (req, res) => {
  try {
    const file = await Dispensary.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

router.delete('/order/:id',async(req,res)=>{

  try{
    const UserId=req.params.id;
   
      const deletedata=await Dispensary.findByIdAndDelete(UserId);
      
     res.send(deletedata)

  }
  catch(e){
    res.send(e);
  }
})
router.patch('/order/:id',async(req,res)=>{

  try{
    const UserId=req.params.id;
      const updatedata=await Dispensary.findByIdAndUpdate(UserId,req.body,{new:true});
     res.send(updatedata)
  }
  catch(e){
    res.send(e);
  }
})

//********************************************************************** */
//*********User Routes */
//******Get All */
router.get('/user',async(req,res)=>{

  try{
      const data=await User.find().sort({_id:-1});
      res.send(data)
  }
  catch(e){
    res.send(e);
  }
})
//******Delete User */
router.delete('/user/:id',async(req,res)=>{

  try{
    const UserId=req.params.id;
   
      const deletedata=await User.findByIdAndDelete(UserId);
      
     res.send(deletedata)

  }
  catch(e){
    res.send(e);
  }
})
//*****Update User */
router.patch('/user/:id',async(req,res)=>{

  try{
    const UserId=req.params.id;
      const updatedata=await User.findByIdAndUpdate(UserId,req.body,{new:true});
     res.send(updatedata)
  }
  catch(e){
    res.send(e);
  }
})
//************** */
//********DOCTOR ROUTES */
//***Get All */
router.get('/doctor',async(req,res)=>{

  try{
      const doctordata=await DoctorsInfo.find();
      res.send(doctordata)
  }
  catch(e){
    res.send(e);
  }
})
//*****Get by Id */
router.get('/doctor/:id',async(req,res)=>{

  try{
    const UserId=req.params.id;
      const doctorsdata=await DoctorsInfo.findById(UserId);
      
     res.send(doctorsdata)
  
  }
  catch(e){
    res.send(e);
  }
})
//*****Delete  */
router.delete('/doctor/:id',async(req,res)=>{

  try{
    const UserId=req.params.id;
      const deletedata=await DoctorsInfo.findByIdAndDelete(UserId);
      
     res.send(deletedata)

  }
  catch(e){
    res.send(e);
  }
})
//*****Update */
router.patch('/doctor/:id',async(req,res)=>{

  try{
    const UserId=req.params.id;
      const updatedata=await DoctorsInfo.findByIdAndUpdate(UserId,req.body,{new:true});
      
     res.send(updatedata)

  }
  catch(e){
    res.send(e);
  }
})

// ******CLINIC APPOINTMENT ROUTES*******
//*********************** */
// *******Post request
router.post('/Appointments', async(request,response)=>{
  try{
    const {doc_id, AppDate, Time, Service, ClinicFee, Name, Email, mobile_no}= request.body;
    const AppointmentUser = new Appointment();
        AppointmentUser.doc_id = doc_id;
        AppointmentUser.AppDate = AppDate;
        AppointmentUser.Time = Time;
        AppointmentUser.Service = Service;
        AppointmentUser.ClinicFee = ClinicFee;
        AppointmentUser.Name = Name;
        AppointmentUser.Email = Email;
        AppointmentUser.mobile_no = mobile_no;
    AppointmentUser.save()
    .then(data =>{
        response.json(data)
    })
  }catch(error){
    console.log('appoint error: ', error);
    }
});

router.patch('/appoint/:id',async(req,res)=>{

  try{
    const UserId=req.params.id;
      const updatedata=await OnlineAppointment.findByIdAndUpdate(UserId,req.body,{new:true});
     res.send(updatedata)
  }
  catch(e){
    res.send(e);
  }
})

router.patch('/appointment/:id',async(req,res)=>{

  try{
    const UserId=req.params.id;
      const updatedata=await Appointment.findByIdAndUpdate(UserId,req.body,{new:true});
     res.send(updatedata)
  }
  catch(e){
    res.send(e);
  }
})

//******** Get All request
router.get('/appointment',async(req,res)=>{

    try{
        const data=await Appointment.find().sort({_id:-1});
        res.send(data)
    }
    catch(e){
      res.send(e);
    }
  });

//*********Delete request
router.delete('/appointment/:id',async(req,res)=>{
    try{
      const UserId=req.params.id;
     
        const deletedata=await Appointment.findByIdAndDelete(UserId);
        
       res.send(deletedata)
  
    }
    catch(e){
      res.send(e);
    }
  })

//********Update request
router.patch('/appointment/:id',async(req,res)=>{

    try{
      const UserId=req.params.id;
        const updatedata=await Appointment.findByIdAndUpdate(UserId,req.body,{new:true});
       res.send(updatedata)
    }
    catch(e){
      res.send(e);
    }
  });

//******Get by Id
router.get('/Appointments/:doc_id/:AppDate',async(req,res,next)=>{
    const Info2 = await Appointment.find({doc_id: req.params.doc_id, AppDate: req.params.AppDate});
    try{
        res.send(Info2)
    }
    catch(error){
      res.status(500).send(error);
    }
});

router.get('/Appointment/:doc_id',async(req,res,next)=>{
    const Info = await Appointment.find({doc_id: req.params.doc_id}).sort({_id:-1});
    try{
        res.send(Info)
    }
    catch(error){
      res.status(500).send(error);
    }
});
//******************** */
//******* ONLINE APPOINTMENTS */
//****Post Request */
router.post('/OnlineAppointments', (request,response)=>{
    const AppointmentUser = new OnlineAppointmentTemplateCopy({
        doc_id:request.body.doc_id,
        AppDate:request.body.AppDate,
        OnlineTime:request.body.OnlineTime,
        Service:request.body.Service,
        OnlineFee:request.body.OnlineFee,
        Name:request.body.Name,
        Email:request.body.Email,
        mobile_no:request.body.mobile_no,
        Accountant_Name:request.body.Accountant_Name,
        Transaction_id:request.body.Transaction_id
    })
    AppointmentUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
      response.json(error)
    })
});

//******Get by ID
router.get('/OnlineAppointments/:doc_id/:AppDate',async(req,res,next)=>{
    const Info2 = await OnlineAppointment.find({doc_id: req.params.doc_id, AppDate: req.params.AppDate});
    try{
        res.send(Info2)
    }
    catch(error){
      res.status(500).send(error);
    }
});

router.get('/OnlineAppointment/:doc_id',async(req,res,next)=>{
    const Info = await OnlineAppointment.find({doc_id: req.params.doc_id}).sort({_id:-1});
    try{
        res.send(Info)
    }
    catch(error){
      res.status(500).send(error);
    }
});

//****Update Request */
router.patch('/onlineapp/:id',async(req,res)=>{

    try{
      const UserId=req.params.id;
        const updatedata=await OnlineAppointment.findByIdAndUpdate(UserId,req.body,{new:true});
        
       res.send(updatedata)
  
    }
    catch(e){
      res.send(e);
    }
  })
  
  //*****Get All Online Appointments */
  router.get('/onlineapp',async(req,res)=>{
  
    try{
        const data=await OnlineAppointment.find().sort({_id:-1});
        res.send(data)
    }
    catch(e){
      res.send(e);
    }
  })

  //*****Delete */
  router.delete('/onlineapp/:id',async(req,res)=>{

    try{
      const UserId=req.params.id;
     
        const deletedata=await OnlineAppointment.findByIdAndDelete(UserId);
        
       res.send(deletedata)
  
    }
    catch(e){
      res.send(e);
    }
  })

  //************************* */

  //**********COMPLAINTS ROUTES */
  //******************* */
  //*****Post request */
  router.post('/complainrecord', function(request, response) {
    const complain = new complainrecord({
      complain:request.body.complain,
      email:request.body.email
    })
    complain.save()
    .then(data =>{
      response.json(data)
    })
    .catch(error =>{
      response.json(error)
    })
  })
  //******Get All */
  router.get('/complainrecord',async(req,res)=>{
  
    try{
        const complaindata=await complainrecord.find().sort({_id:-1});
        res.send(complaindata)
    }
    catch(e){
      res.send(e);
    }
  })

  //*******Delete request */
  router.delete('/complainrecord/:id',async(req,res)=>{
  
    try{
      const UserId=req.params.id;
     
        const deletedata=await complainrecord.findByIdAndDelete(UserId);
        
       res.send(deletedata)
  
    }
    catch(e){
      res.send(e);
    }
  })
  //*********** */
    //**********FEEDBACK ROUTES */
  //******************* */
  //*****Post request */
  router.post('/feedbackrecord', function(request, response) {
    const feedback = new feedbackrecord({
      feedback:request.body.feedback,
      name:request.body.name
    })
    feedback.save()
    .then(data =>{
      response.json(data)
    })
    .catch(error =>{
      response.json(error)
    })
  })
  
  //******Get All */
  router.get('/feedback',async(req,res)=>{

    try{
        const feedbackdata=await feedbackrecord.find().sort({_id:-1});
        res.send(feedbackdata)
    }
    catch(e){
      res.send(e);
    }
  })
  //*****Delete Request */
  router.delete('/feedback/:id',async(req,res)=>{
  
    try{
      const UserId=req.params.id;
     
        const deletedata=await feedbackrecord.findByIdAndDelete(UserId);
        
       res.send(deletedata)
  
    }
    catch(e){
      res.send(e);
    }
  })
  
router.post('/BookingTime',async(request,response)=>{
 try{ const {doc_id, Time} = request.body;
    const BookingTimes = new BookingTime();
     BookingTimes.doc_id = doc_id;
     BookingTimes.Time= Time;
    BookingTimes.save()
    .then(data =>{
        response.json(data)
    })
  }catch(error) {
      response.json(error)
    }
});

router.delete('/booking/:id',async(req,res)=>{
  
  try{
    const UserId=req.params.id;
   
      const deletedata=await BookingTime.findByIdAndDelete(UserId);
      
     res.send(deletedata)

  }
  catch(e){
    res.send(e);
  }
})

router.post('/OnlineBookingTime', async(request,response)=>{
  try{ const {doc_id, OnlineTime} = request.body;
  const BookingTimes = new OnlineBookingTime();
   BookingTimes.doc_id = doc_id;
   BookingTimes.OnlineTime= OnlineTime;
   BookingTimes.save()
  .then(data =>{
      response.json(data)
  })
}catch(error) {
    response.json(error)
  }

});

router.get('/DoctorsInfo',async(request,response)=>{
    const DoctorInfo = await DoctorsInfo.find();
 try{
     response.send(DoctorInfo)
 }
 catch(error){
   response.status(500).send(error);
 }
});

router.get('/BookingTime/:doc_id',async(req,res,next)=>{
    const Info = await BookingTime.find({doc_id: req.params.doc_id});
    try{
        res.send(Info)
    }
    catch(error){
      res.status(500).send(error);
    }
});

router.get('/OnlineBookingTime/:doc_id',async(req,res,next)=>{
    const Info = await OnlineBookingTime.find({doc_id: req.params.doc_id});
    try{
        res.send(Info)
    }
    catch(error){
      res.status(500).send(error);
    }
});

router.delete('/onlinebooking/:id',async(req,res)=>{
  
  try{
    const UserId=req.params.id;
   
      const deletedata=await OnlineBookingTime.findByIdAndDelete(UserId);
      
     res.send(deletedata)

  }
  catch(e){
    res.send(e);
  }
})

router.get('/PatientAppointment/:Email',async(req,res,next)=>{
    const Info = await Appointment.find({Email: req.params.Email}).sort({_id:-1});
    try{
        res.send(Info)
    }
    catch(error){
      res.status(500).send(error);
    }
});
router.get('/OnlinePatientAppointment/:Email',async(req,res,next)=>{
    const Info = await OnlineAppointment.find({Email: req.params.Email}).sort({_id:-1});
    try{
        res.send(Info)
    }
    catch(error){
      res.status(500).send(error);
    }
});

router.post('/OnlineConsultation', (request,response)=>{
    const Consultation = new OnlineConsultation({
        email:request.body.email,
        roomId:request.body.roomId,
        doctor:request.body.doctor
    })
    Consultation.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
});

router.get('/OnlineConsultation/:doctor/:email',async(req,res,next)=>{
    const Info = await OnlineConsultation.find({email: req.params.email, doctor: req.params.doctor}).sort({_id:-1});
    try{
        res.send(Info)
    }
    catch(error){
      res.status(500).send(error);
    }
});

router.get('/user/:name',async(req,res)=>{

  try{
    var regex= new RegExp(req.params.name,'i');
   
      const deletedata=await User.find({name:regex});
     res.send(deletedata)
  }
  catch(e){
    res.send(e);
    console.log("Record not found");
  }
})

router.get('/search/:Name',async(req,res)=>{

  try{
    var regex=new RegExp(req.params.Name,'i')
      const doctordata=await DoctorsInfo.find({Name:regex});
      res.send(doctordata)
  }
  catch(e){
    res.send(e);
  }
})

module.exports = router;
