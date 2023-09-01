const express = require("express");
const router = express.Router();
const TeacherController = require('../../../controller/teacherController');
const passport = require('passport');

// router.get('/profile/:id', passport.checkAuthentication, TeacherController.profile);

router.post('/register', TeacherController.register);
router.post('/login', TeacherController.create);

// router.post('/create', TeacherController.create);
// router.post('/create-session', passport.authenticate(
//     'teacher-local',
//     { failureRedirect: '/teacher/login' }
// ), TeacherController.createSession);

// Use 'google' (all lowercase) as the strategy name
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/teacher/login' }), TeacherController.createSession);



router.get('/logout', TeacherController.logout);

module.exports = router;
