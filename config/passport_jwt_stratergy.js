const passport = require("passport");
const JWTStratergy = require('passport-jwt-stratergy').Stratergy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Teacher = require('../modals/TeacherModal');
const Student = require('../modals/StudentModal');
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}
passport.use(new JWTStratergy(opts, function (jwtPayload, done) {
    Teacher.findById(jwtPayload._id, function (err, teacher) {
        if (err) {
            console.log('Error in finding the Teacher');
            return done(err, false);

        }
        if (teacher) {
            return done(null, teacher);
        } else {
            return done(null, false);

        }
    })
    Student.findById(jwtPayload._id, function (err, student) {
        if (err) {
            console.log('Error in finding the Student');
            return done(err, false);

        }
        if (student) {
            return done(null, student);
        } else {
            return done(null, false);

        }
    })
}))
module.exports = passport;