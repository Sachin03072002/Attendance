const mongoose = require("mongoose");
const DB = 'mongodb://127.0.0.1:27017/attendance';
mongoose.connect(DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'error in connecting to the databse'));
db.once('open', function () {
    console.log("seccessfully connected to the databse: MONGODB");

});
module.exports = db;

