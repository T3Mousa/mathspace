'use strict';

const { Grade, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Grades';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Grades";
        return queryInterface.bulkInsert(options, [
            {
                assignmentId: 1,
                studentId: 1,
                grade: 97.50,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 2,
                grade: 90.50,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 3,
                grade: 86.50,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 4,
                grade: 50.00,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 5,
                grade: 79.00,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 6,
                grade: 81.50,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 7,
                grade: 70.50,
                isCompleted: true
            },
            {
                assignmentId: 2,
                studentId: 1,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 2,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 3,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 4,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 5,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 6,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 7,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 1,
                studentId: 15,
                grade: 97.50,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 16,
                grade: 90.50,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 17,
                grade: 86.50,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 18,
                grade: 50.00,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 19,
                grade: 79.00,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 20,
                grade: 81.50,
                isCompleted: true
            },
            {
                assignmentId: 1,
                studentId: 21,
                grade: 70.50,
                isCompleted: true
            },
            {
                assignmentId: 2,
                studentId: 15,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 16,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 17,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 18,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 19,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 20,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 2,
                studentId: 21,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 3,
                studentId: 8,
                grade: 97.50,
                isCompleted: true
            },
            {
                assignmentId: 3,
                studentId: 9,
                grade: 90.50,
                isCompleted: true
            },
            {
                assignmentId: 3,
                studentId: 10,
                grade: 86.50,
                isCompleted: true
            },
            {
                assignmentId: 3,
                studentId: 11,
                grade: 50.00,
                isCompleted: true
            },
            {
                assignmentId: 3,
                studentId: 12,
                grade: 79.00,
                isCompleted: true
            },
            {
                assignmentId: 3,
                studentId: 13,
                grade: 81.50,
                isCompleted: true
            },
            {
                assignmentId: 3,
                studentId: 14,
                grade: 70.50,
                isCompleted: true
            },
            {
                assignmentId: 4,
                studentId: 8,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 4,
                studentId: 9,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 4,
                studentId: 10,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 4,
                studentId: 11,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 4,
                studentId: 12,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 4,
                studentId: 13,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 4,
                studentId: 14,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 5,
                studentId: 15,
                grade: 91.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 16,
                grade: 95.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 17,
                grade: 83.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 18,
                grade: 90.00,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 19,
                grade: 59.00,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 20,
                grade: 75.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 21,
                grade: 80.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 15,
                grade: 89.00,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 16,
                grade: 92.00,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 17,
                grade: 87.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 18,
                grade: 88.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 19,
                grade: 78.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 20,
                grade: 80.00,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 21,
                grade: 85.50,
                isCompleted: true
            },
            {
                assignmentId: 7,
                studentId: 15,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 16,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 17,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 18,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 19,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 20,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 21,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 5,
                studentId: 1,
                grade: 91.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 2,
                grade: 95.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 3,
                grade: 83.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 4,
                grade: 90.00,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 5,
                grade: 59.00,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 6,
                grade: 75.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 7,
                grade: 80.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 1,
                grade: 89.00,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 2,
                grade: 92.00,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 3,
                grade: 87.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 4,
                grade: 88.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 5,
                grade: 78.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 6,
                grade: 80.00,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 7,
                grade: 85.50,
                isCompleted: true
            },
            {
                assignmentId: 7,
                studentId: 1,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 2,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 3,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 4,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 5,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 6,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 7,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 5,
                studentId: 8,
                grade: 91.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 9,
                grade: 95.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 10,
                grade: 83.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 11,
                grade: 90.00,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 12,
                grade: 59.00,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 13,
                grade: 75.50,
                isCompleted: true
            },
            {
                assignmentId: 5,
                studentId: 14,
                grade: 80.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 8,
                grade: 89.00,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 9,
                grade: 92.00,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 10,
                grade: 87.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 11,
                grade: 88.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 12,
                grade: 78.50,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 13,
                grade: 80.00,
                isCompleted: true
            },
            {
                assignmentId: 6,
                studentId: 14,
                grade: 85.50,
                isCompleted: true
            },
            {
                assignmentId: 7,
                studentId: 8,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 9,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 10,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 11,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 12,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 13,
                grade: null,
                isCompleted: false
            },
            {
                assignmentId: 7,
                studentId: 14,
                grade: null,
                isCompleted: false
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Grades";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            assignmentId: { [Op.between]: [1, 21] }
        })
    }
}
