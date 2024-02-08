'use strict';

const { ClassAssignment, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'ClassAssignments';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "ClassAssignments";
        return queryInterface.bulkInsert(options, [
            {
                assignmentId: 1,
                classId: 1
            },
            {
                assignmentId: 2,
                classId: 1
            },
            {
                assignmentId: 7,
                classId: 1
            },
            {
                assignmentId: 8,
                classId: 1
            },
            {
                assignmentId: 1,
                classId: 2
            },
            {
                assignmentId: 2,
                classId: 2
            },
            {
                assignmentId: 7,
                classId: 2
            },
            {
                assignmentId: 8,
                classId: 2
            },
            {
                assignmentId: 13,
                classId: 3
            },
            {
                assignmentId: 14,
                classId: 3
            },
            {
                assignmentId: 15,
                classId: 3
            },
            {
                assignmentId: 3,
                classId: 4
            },
            {
                assignmentId: 4,
                classId: 4
            },
            {
                assignmentId: 9,
                classId: 4
            },
            {
                assignmentId: 10,
                classId: 4
            },
            {
                assignmentId: 16,
                classId: 5
            },
            {
                assignmentId: 17,
                classId: 5
            },
            {
                assignmentId: 18,
                classId: 5
            },
            {
                assignmentId: 3,
                classId: 6
            },
            {
                assignmentId: 4,
                classId: 6
            },
            {
                assignmentId: 9,
                classId: 6
            },
            {
                assignmentId: 10,
                classId: 6
            },
            {
                assignmentId: 5,
                classId: 7
            },
            {
                assignmentId: 6,
                classId: 7
            },
            {
                assignmentId: 11,
                classId: 7
            },
            {
                assignmentId: 12,
                classId: 7
            },
            {
                assignmentId: 19,
                classId: 8
            },
            {
                assignmentId: 20,
                classId: 8
            },
            {
                assignmentId: 21,
                classId: 8
            },
            {
                assignmentId: 5,
                classId: 9
            },
            {
                assignmentId: 6,
                classId: 9
            },
            {
                assignmentId: 11,
                classId: 9
            },
            {
                assignmentId: 12,
                classId: 9
            },

        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "ClassAssignments";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            assignmentId: { [Op.between]: [1, 21] }
        })
    }
}
