const express = require("express");
const app = express();
const port = 8000;
const db = require('./config/mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", require('./routes'));
app.listen(port, function (err) {
    if (err) {
        console.log("error in connecting to the database");

    } else {
        console.log(`server is running on http://localhost:${port}`);
    }
})