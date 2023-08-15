const express = require("express");
const router = express.Router();
const StudentController = require('../../../controller/studentController');

router.post('/register', StudentController.register);
router.post('/login', StudentController.login);
module.exports = router;