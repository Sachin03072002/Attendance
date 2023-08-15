const express = require("express");
const router = express.Router();
console.log("router loaded");
router.use('/teacher', require('./teacher'));
router.use('/student', require('./student'));
module.exports = router;