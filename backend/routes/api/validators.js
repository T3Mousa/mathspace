const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Model } = require('sequelize');


const validateClassParams = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Class name is required.'),
    // check('classImg')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Class image is required.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Class description is required.'),
    handleValidationErrors
]


module.exports = {
    validateClassParams
}