const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const Teacher = require('../modals/TeacherModal');
const env = require('../')
const Student = require('../modals/StudentModal');


//passport using the google stratergy
passport.use(new GoogleStratergy({
    clientID: "175596792337-edf3a7l6ke6omfrbj5h7mu853hvpln3r.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/users/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        const email = profile.emails[0].value;
        Teacher.findOne({ Email: email }).exec(function (err, teacher) {
            if (err) {
                console.log('error in google stratergy passport', err);
                return done(err);
            }

            if (teacher) {
                return done(null, teacher);
            } else {
                Teacher.create({
                    Name: profile.displayName,
                    Email: email,
                    Password: crypto.randomBytes(5).toString('hex')
                }, function (err, newTeacher) {
                    if (err) {
                        console.log('error in creating user google stratergy', err);
                        return done(err);
                    }
                    return done(null, newTeacher);
                })
            }
        })
        Student.findOne({ Email: email }).exec(function (err, student) {
            if (err) {
                console.log('error in google stratergy passport', err);
                return done(err);
            }

            if (student) {
                return done(null, student);
            } else {
                Teacher.create({
                    Name: profile.displayName,
                    Email: email,
                    Password: crypto.randomBytes(5).toString('hex')
                }, function (err, newStudent) {
                    if (err) {
                        console.log('error in creating user google stratergy', err);
                        return;
                    }
                    return done(null, newStudent);
                })
            }
        })
    }
))
module.exports = passport;