const express = require("express");
const router = express.Router();
const StudentController = require('../../../controller/studentController');
const passport = require('passport');

// Import your StudentModal here
const Student = require("../../../modals/StudentModal");

// Get student profile
router.get('/profile/:id', passport.checkAuthentication, StudentController.profile);

// Student signup
router.post('/register', StudentController.register);

// Create student
router.post('/login', StudentController.create);

// Student login
// router.post('/login', passport.authenticate('student-local'), (req, res) => {
//     // This handler will be called after successful authentication
//     // You can send a success JSON response or any other data
//     res.json({ success: true, message: 'Login successful' });
// });

// Google authentication routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // This handler will be called after successful authentication
    // You can send a success JSON response or any other data
    res.json({ success: true, message: 'Google authentication successful' });
});

// Update student information
router.post('/update/:id', passport.checkAuthentication, StudentController.update);

// Logout student
router.get('/logout', StudentController.logout);

// Handle authentication failure
router.post('/login', (req, res) => {
    // This handler will be called if authentication fails
    // You can send an error JSON response or any other data
    res.status(401).json({ success: false, message: 'Authentication failed' });
});

module.exports = router;
