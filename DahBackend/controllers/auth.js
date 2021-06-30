const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/keys');

exports.signupController = async (req, res) => {
    const { name, email, cnic, phone, role, password, password2 } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errorMessage: 'Email already exists',
            });
        }
        const username  = await User.findOne({ name });
        if (username) {
            return res.status(400).json({
                errorMessage: 'Doctor already exists',
            });
        }
        const usercnic  = await User.findOne({ cnic });
        if (usercnic) {
            return res.status(400).json({
                errorMessage: 'CNIC already exists',
            });
        }
        const userphone  = await User.findOne({ phone });
        if (userphone) {
            return res.status(400).json({
                errorMessage: 'Phone number already exists',
            });
        }

        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.cnic = cnic;
        newUser.phone = phone;
        newUser.role = role;
        newUser.password2 = password2;

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.json({
            successMessage: 'Registration success.',
        });
    } catch (err) {
        console.log('signupController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};

exports.signinController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errorMessage: 'Invalid credentials',
            });
        }

        const payload = {
            user: {
                _id: user._id,
            },
        };

        jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
            if (err) console.log('jwt error: ', err);
            const { _id, name, email, role } = user;

            res.json({
                token,
                user: { _id, name, email, role },
            });
        });
    } catch (err) {
        console.log('signinController error: ', err);
        res.status(500).json({
            errorMessage: 'Server error',
        });
    }
};
