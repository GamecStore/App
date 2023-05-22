const mongoose = require('mongoose');

const User = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    gender: { type: String },
    // firstName: { type: String },
    // lastName: { type: String },
    // username:{type:},
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true},
    dateOfBirth: { type: Date },
    role: { type: String, default: 'user' },
    // created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', User);