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
    if (req.isAuthenticated()) {
        // return res.redirect('/teacher/profile');
        return res.send('login page');
    }
    // return res.render('', {
    //     // title:
    // })
}
module.exports.signup = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/teacher/login');
    }
    return res.render('', {
        // title:
    })
}
module.exports.create = async function (req, res) {
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
                message: "invalid credentials"
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

module.exports.createSession = async function (req, res) {
    try {
        const user = req.user; // Assuming req.user is the authenticated user object

        // Set a cookie named 'user_id' with the user's ID as the value
        res.cookie('user_id', user._id, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            maxAge: 24 * 60 * 60 * 1000, // Cookie will expire in 1 day (optional)
            // Other cookie options can be added here
        });

        return res.status(200).json({
            success: true,
            message: 'Session created and cookie set successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error creating session'
        });
    }
};



module.exports.profile = async function (req, res) {
    try {
        const student = await Student.findById(req.params.id).exec();
        return res.status(200).send(student);
        // return res.render('user_profile', {
        //     title: 'Student Profile',
        //     profile_user: student
        // });
    } catch (err) {
        console.log(err);
        // Handle the error and send an appropriate response
        return res.status(500).send(`Internal Server Error : ${err}`);
    }
}






module.exports.update = async (req, res) => {
    const studentID = req.params.id;
    console.log(studentID);
    console.log('req.user:', req.student);
    const updatedData = {
        Name: req.body.Name,
        ClassRoll: req.body.ClassRoll,
        Section: req.body.Section,
        Year: req.body.Year,
        Email: req.body.Email,
        Password: req.body.Password,
    }
    try {
        // Use req.user._id instead of req.Student._id
        if (req.user._id == studentID) {
            const updatedStudent = await Student.findByIdAndUpdate(studentID, updatedData, {
                new: true,
                runValidators: true
            }).exec();
            if (!updatedStudent) {
                return res.status(404).json({
                    success: false,
                    message: "Student not found"
                });
            }
            return res.json({
                success: true,
                message: 'Student Updated Successfully'
            });

        } else {
            console.log('inside else');
            return res.status(403).json({
                success: false,
                message: 'Unauthorized'
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: `Error: ${err}`
        });
    }
}







module.exports.logout = async function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            console.log('error', err);
            return next(err);
        }

    })
    return res.status(200).json({
        success: true,
        message: `Successfully logout ~ ${req.Name}`
    })
    // return res.redirect('/');

}