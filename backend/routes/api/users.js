const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Teacher, Student } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

const router = express.Router();

//backend validation for signup
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('firstName')
        .exists({ checkNull: true })
        .withMessage('First name is required.'),
    check('lastName')
        .exists({ checkNull: true })
        .withMessage('Last name is required.'),
    // check('username')
    //     .exists({ checkFalsy: true })
    //     .isLength({ min: 4 })
    //     .withMessage('Please provide a username with at least 4 characters.'),
    // check('username')
    //     .not()
    //     .isEmail()
    //     .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { email, firstName, lastName, userRole, username, password } = req.body;

    const userList = await User.findAll({
        attributes: ['email']
    })
    for (let i = 0; i < userList.length; i++) {
        const user = userList[i]
        const userObj = user.toJSON()
        if (userObj.email === email) {
            res.status(400);
            return res.json({
                "message": "User already exists",
                "errors": {
                    "email": "User with that email already exists"
                }
            })
        }
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, firstName, lastName, userRole, username, hashedPassword });
    console.log(user)
    if (user.userRole === "teacher") {
        await Teacher.create({
            userId: user.id
        })
    }
    if (user.userRole === "student") {
        await Student.create({
            userId: user.id
        })
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole
        // username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            // username: user.username,
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});

router.put('/:id/update', singleMulterUpload('image'), async (req, res, next) => {
    try {
        const { userId } = req.body;
        let user;

        if (userId) {
            user = await User.findByPk(userId);
        } else {
            throw new Error("No user founder with that id")
        }

        let imgUrl;

        if (req.file) {
            imgUrl = await singlePublicFileUpload(req.file); //converts data from form
        }
        user.profileImg = imgUrl;
        await user.save();
        return res.json(user)

    } catch (e) {
        next(e)
    }

})


module.exports = router;
