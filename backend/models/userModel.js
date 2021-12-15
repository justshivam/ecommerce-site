const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const MIN_PASS_LENGTH = 8;
const MIN_NAME_LENGTH = 4;
const MAX_NAME_LENGTH = 30;

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [MAX_NAME_LENGTH, `Name Cannot Exceed ${MAX_NAME_LENGTH} characters`],
        minlength: [MIN_NAME_LENGTH, `Name should have more than ${MIN_NAME_LENGTH} characters`]
    },

    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Enter A Valid Email"]
    },

    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [MIN_PASS_LENGTH, `Password should have more than ${MIN_PASS_LENGTH} characters`],
        select: false
    },

    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

    role: {
        type: String,
        default: "user",
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,


});

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next();
    };

    this.password = await bcryptjs.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
};

// Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
