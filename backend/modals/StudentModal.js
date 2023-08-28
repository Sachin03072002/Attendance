const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Name is Required'],
    },
    UniversityRoll: {
        type: Number,
        unique: [true, 'This roll number already exists'],
    },
    ClassRoll: {
        type: Number,
    },
    Section: {
        type: String,
    },
    Year: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    Password: {
        type: String,
        minlength: 6,
        required: [true, 'Password Is Required'],
    },
    MobileNumber: {
        type: Number,
        maxlength: 10,
    },
    Photo: {
        dataBuffer: {
            type: Buffer,
        },
        contentType: {
            type: String,
        },
    }
});

// Encrypt password
studentSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
});

// sign jwt and return 
studentSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, 'secret', {
        expiresIn: '120m'
    });
};


//we are using bcrypt library, another function of checking the password entered with the password in database
studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.Password);

};



const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
