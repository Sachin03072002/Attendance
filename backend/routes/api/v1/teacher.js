const express = require("express");
const router = express.Router();
const TeacherController = require('../../../controller/teacherController');
const passport = require('passport');

// router.get('/profile/:id', passport.checkAuthentication, TeacherController.profile);

// routes for rendering the page
// router.get('/signup', TeacherController.signup);
// router.get('/login', TeacherController.login);

//signup
router.post('/register', TeacherController.register);
router.post('/login', TeacherController.create);

// router.post('/create', TeacherController.create);
// router.post('/create-session', passport.authenticate(
//     'local',
//     { failureRedirect: '/student/login' }
// ), TeacherController.createSession);

// Use 'google' (all lowercase) as the strategy name
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/teacher/login' }), TeacherController.login);



router.get('/logout', TeacherController.logout);

module.exports = router;
