'use strict';

const { ClassEnrollment, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'ClassEnrollments';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "ClassEnrollments";
        return queryInterface.bulkInsert(options, [
            {
                classId: 1,
                studentId: 4
            },
            {
                classId: 1,
                studentId: 5
            },
            {
                classId: 1,
                studentId: 6
            },
            {
                classId: 1,
                studentId: 7
            },
            {
                classId: 1,
                studentId: 8
            },
            {
                classId: 1,
                studentId: 9
            },
            {
                classId: 5,
                studentId: 4
            },
            {
                classId: 5,
                studentId: 5
            },
            {
                classId: 5,
                studentId: 6
            },
            {
                classId: 5,
                studentId: 7
            },
            {
                classId: 5,
                studentId: 8
            },
            {
                classId: 5,
                studentId: 9
            },
            {
                classId: 8,
                studentId: 10
            },
            {
                classId: 8,
                studentId: 11
            },
            {
                classId: 8,
                studentId: 12
            },
            {
                classId: 8,
                studentId: 13
            },
            {
                classId: 8,
                studentId: 14
            },
            {
                classId: 8,
                studentId: 15
            },
            {
                classId: 6,
                studentId: 10
            },
            {
                classId: 6,
                studentId: 11
            },
            {
                classId: 6,
                studentId: 12
            },
            {
                classId: 6,
                studentId: 13
            },
            {
                classId: 6,
                studentId: 14
            },
            {
                classId: 6,
                studentId: 15
            },
            {
                classId: 3,
                studentId: 16
            },
            {
                classId: 3,
                studentId: 17
            },
            {
                classId: 3,
                studentId: 18
            },
            {
                classId: 3,
                studentId: 19
            },
            {
                classId: 3,
                studentId: 20
            },
            {
                classId: 3,
                studentId: 21
            },
            {
                classId: 4,
                studentId: 16
            },
            {
                classId: 4,
                studentId: 17
            },
            {
                classId: 4,
                studentId: 18
            },
            {
                classId: 4,
                studentId: 19
            },
            {
                classId: 4,
                studentId: 20
            },
            {
                classId: 4,
                studentId: 21
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "ClassEnrollments";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            classId: { [Op.between]: [1, 9] }
        })
    }
}
