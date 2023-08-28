const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Teacher = require('../modals/TeacherModal');
const Student = require('../modals/StudentModal');

// Teacher authentication strategy
passport.use('teacher-local', new LocalStrategy({
    usernameField: 'Email',
    passReqToCallback: true
}, function (req, Email, Password, done) {
    Teacher.findOne({ Email: Email }, function (err, teacher) {
        if (err) {
            return done(err);
        }

        if (!teacher || teacher.Password !== Password) {
            return done(null, false);
        }

        return done(null, teacher);
    });
}));

// Student authentication strategy
// Student authentication strategy
passport.use('student-local', new LocalStrategy({
    usernameField: 'Email',
    passReqToCallback: true
}, async function (req, Email, Password, done) {
    try {
        console.log('student-local strategy started');
        const student = await Student.findOne({ Email: Email });
        if (!student) {
            console.log('Student not found');
            return done(null, false, { message: 'Student not found' });
        }

        if (student.Password !== Password) {
            console.log('Incorrect password');
            return done(null, false, { message: 'Incorrect password' });
        }

        console.log('student-local strategy completed');
        return done(null, student);
    } catch (err) {
        console.log('Error in student-local strategy:', err);
        return done(err);
    }
}));


// Serialization and deserialization for both teachers and students
passport.serializeUser(function (user, done) {
    console.log('student se', user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // Teacher.findById(id, function (err, teacher) {
    //     if (err) {
    //         console.log('Error in finding teacher --> Passport', err);
    //         return done(err);
    //     }

    //     if (teacher) {
    //         done(null, teacher);
    //     } else {
    Student.findById(id, function (err, student) {
        if (err) {
            console.log('Error in finding student --> Passport', err);
            return done(err);
        }
        console.log('Student de:', student);
        done(null, student);
    });
    //     }
    // });
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    try {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    } catch (err) {
        console.log('error');
    }
};


// Middleware to set authenticated user in locals
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        console.log('Authenticated Student:', req.student);
        res.locals.student = req.student;
    }
    next();
};

module.exports = passport;
