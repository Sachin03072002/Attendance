const Student = require('../modals/StudentModal');
const jwt = require('jsonwebtoken');
module.exports.register = async function (req, res) {
    console.log('register', req.body);
    try {
        const student = await Student.create(req.body);
        return res.status(200).json({
            success: true,
            message: student
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
module.exports.login = async function (req, res) {
    try {
        let { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({
                success: false,
                message: "No email or password",
            });
        }
        const student = await Student.findOne({ Email: Email });
        if (!student) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        const isMatch = await student.matchPassword(Password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "inva;id credentials"
            });
        }
        const token = student.getSignedJwtToken();
        console.log(token);
        res.status(200).json({
            success: true,
            message: `Log in successfully ~ keep the token safe ${student.Name}`
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Error Occured",
        })
    }
}