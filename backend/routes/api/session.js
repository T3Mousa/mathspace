const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// backend validation for login
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];


// Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    // console.log(credential, password, "************")
    const user = await User.unscoped().findOne({
        where: {
            email: credential
        }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { message: 'The provided credentials were invalid.' };
        return next(err);
    }

    const safeUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userRole: user.userRole,
        profileImg: user.profileImg
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});



module.exports = router;
