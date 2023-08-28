const Teacher = require('../modals/TeacherModal');
const jwt = require('jsonwebtoken');
module.exports.register = async function (req, res) {
    console.log('register', req.body);
    try {
        const teacher = await Teacher.create(req.body);
        return res.status(200).json({
            success: true,
            message: teacher
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
// module.exports.login = async function (req, res) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/teacher/profile');
//     }
//     return res.render('', {
//         // title:
//     })
// }
// module.exports.signup = async function (req, res) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/teacher/login');
//     }
//     return res.render('', {
//         // title:
//     })
// }
module.exports.create = async function (req, res) {
    try {
        let { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({
                success: false,
                message: "No email or password",
            });
        }
        const teacher = await Teacher.findOne({ Email: Email });
        if (!teacher) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
        const isMatch = await teacher.matchPassword(Password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials"
            });
        }
        const token = teacher.getSignedJwtToken();
        console.log(token);
        res.status(200).json({
            success: true,
            message: `Log in successfully ~ keep the token safe ${teacher.Name}`
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "Error Occured",
        })
    }
}

module.exports.profile = async function (req, res) {
    Teacher.findById(req.params.id, function (err, teacher) {
        if (err) {
            console.log(err);
        }
        return res.render('user_profile', {
            title: 'Teacher Profile',
            profile_user: teacher

        });
    });
};

module.exports.logout = async function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            console.log('error', err);
            return next(err);
        }

    })
    return res.status(200).json({
        success: true,
        message: 'Successfully logout'
    })
    // return res.redirect('/');

}