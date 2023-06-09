const mongoose = require('mongoose');

const User = mongoose.Schema
    ({
        email: { type: String, required: true, unique: true },
        gender: { type: String },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        dob: { type: Date },
        role: { type: String, default: 'user' },
        created: { type: Date, default: Date.now },
        gameids: { type: Array, default: [] },
        // game ids for cart
        wishlistids: { type: Array, default: [] },
        library: { type: Array, default: [] },
        // game ids for wishlist
    });

module.exports = mongoose.model('User', User);