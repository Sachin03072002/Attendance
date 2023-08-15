const express = require("express");
const router = express.Router();
const TeacherController = require('../../../controller/teacherController');

router.post('/register', TeacherController.register);
router.post('/login', TeacherController.login);
module.exports = router;