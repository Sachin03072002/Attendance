const passport = require('passport');
const googleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const Teacher = require('../modals/TeacherModal');
const env = require('../')
const Student = require('../modals/StudentModal');


//passport using the google stratergy
passport.use(new googleStratergy({
    clientID: "175596792337-edf3a7l6ke6omfrbj5h7mu853hvpln3r.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
},
    function (accessToken, refreshToken, profile, done) {
        Teacher.findOne({ Email: profile.email[0].value }).exec(function (err, teacher) {
            if (err) {
                console.log('error in google stratergy passport', err);
                return;
            }
            console.log(profile);
            if (teacher) {
                return done(null, teacher);
            } else {
                Teacher.create({
                    Name: profile.displayName,
                    Email: profile.emails[0].value,
                    Password: crypto.randomBytes(20).toString('hex')
                }, function (err, newTeacher) {
                    if (err) {
                        console.log('error in creating user google stratergy', err);
                        return;
                    }
                    return done(null, newTeacher);
                })
            }
        })
        Student.findOne({ Email: profile.email[0].value }).exec(function (err, student) {
            if (err) {
                console.log('error in google stratergy passport', err);
                return;
            }
            console.log(profile);
            if (student) {
                return done(null, student);
            } else {
                Teacher.create({
                    Name: profile.displayName,
                    Email: profile.emails[0].value,
                    Password: crypto.randomBytes(20).toString('hex')
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