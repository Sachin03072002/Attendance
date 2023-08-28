const express = require("express");
const router = express.Router();
router.use('/validateEmail', require('./Email'));

module.exports = router;