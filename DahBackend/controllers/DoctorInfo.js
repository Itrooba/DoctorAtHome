const Doctor = require('../models/DoctorsInfo');
const DoctorsInfoTemplateCopy = require("../models/DoctorsInfo");
const User = require('../models/User');

exports.doctorController = async (req, res) => {
    const user = await User.findOne({ name: req.body.Name });
    if (!user) {
        return res.status(400).json({
            errorMessage: 'Register Doctor First...',
        });
    }
    const doctor = await Doctor.findOne({ Name: req.body.Name });
    if (doctor) {
        return res.status(400).json({
            errorMessage: 'Doctor already exists',
        });
    }
    const DoctorsInfoUser = new DoctorsInfoTemplateCopy({
        Name:req.body.Name,
        Speciality:req.body.Speciality,
        ClinicFee:req.body.ClinicFee,
        OnlineFee:req.body.OnlineFee,
        SetOnline:req.body.SetOnline,
    })
    DoctorsInfoUser.save()
    .then(data =>{
        res.json(data)
    })
    .catch(error =>{
        res.json(error)
    })
};

