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
                assignmentId: 1,
                classId: 4
            },
            {
                assignmentId: 1,
                classId: 9
            },
            {
                assignmentId: 2,
                classId: 1
            },
            {
                assignmentId: 2,
                classId: 4
            },
            {
                assignmentId: 2,
                classId: 9
            },
            {
                assignmentId: 3,
                classId: 2
            },
            {
                assignmentId: 3,
                classId: 6
            },
            {
                assignmentId: 3,
                classId: 7
            },
            {
                assignmentId: 4,
                classId: 2
            },
            {
                assignmentId: 4,
                classId: 6
            },
            {
                assignmentId: 4,
                classId: 7
            },
            {
                assignmentId: 5,
                classId: 3
            },
            {
                assignmentId: 5,
                classId: 5
            },
            {
                assignmentId: 5,
                classId: 8
            },
            {
                assignmentId: 6,
                classId: 3
            },
            {
                assignmentId: 6,
                classId: 5
            },
            {
                assignmentId: 6,
                classId: 8
            },
            {
                assignmentId: 7,
                classId: 3
            },
            {
                assignmentId: 7,
                classId: 5
            },
            {
                assignmentId: 7,
                classId: 8
            },

        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "ClassAssignments";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            assignmentId: { [Op.between]: [1, 7] }
        })
    }
}
