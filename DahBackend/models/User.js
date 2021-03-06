const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        cnic: {
            type: Number,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        password2: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0,
        },
        modifiedWhen:{
            type: Date,
            default: Date.now,
        }
    },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
