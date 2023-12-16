'use strict';

const { StudentLesson, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'StudentLessons';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "StudentLessons";
        return queryInterface.bulkInsert(options, [
            {
                lessonId: 1,
                studentId: 1
            },
            {
                lessonId: 1,
                studentId: 2
            },
            {
                lessonId: 1,
                studentId: 3
            },
            {
                lessonId: 1,
                studentId: 4
            },
            {
                lessonId: 1,
                studentId: 5
            },
            {
                lessonId: 1,
                studentId: 6
            },
            {
                lessonId: 1,
                studentId: 7
            },
            {
                lessonId: 2,
                studentId: 1
            },
            {
                lessonId: 2,
                studentId: 2
            },
            {
                lessonId: 2,
                studentId: 3
            },
            {
                lessonId: 2,
                studentId: 4
            },
            {
                lessonId: 2,
                studentId: 5
            },
            {
                lessonId: 2,
                studentId: 6
            },
            {
                lessonId: 2,
                studentId: 7
            },
            {
                lessonId: 3,
                studentId: 1
            },
            {
                lessonId: 3,
                studentId: 2
            },
            {
                lessonId: 3,
                studentId: 3
            },
            {
                lessonId: 3,
                studentId: 4
            },
            {
                lessonId: 3,
                studentId: 5
            },
            {
                lessonId: 3,
                studentId: 6
            },
            {
                lessonId: 3,
                studentId: 7
            },
            {
                lessonId: 25,
                studentId: 8
            },
            {
                lessonId: 25,
                studentId: 9
            },
            {
                lessonId: 25,
                studentId: 10
            },
            {
                lessonId: 25,
                studentId: 11
            },
            {
                lessonId: 25,
                studentId: 12
            },
            {
                lessonId: 25,
                studentId: 13
            },
            {
                lessonId: 25,
                studentId: 14
            },
            {
                lessonId: 26,
                studentId: 8
            },
            {
                lessonId: 26,
                studentId: 9
            },
            {
                lessonId: 26,
                studentId: 10
            },
            {
                lessonId: 26,
                studentId: 11
            },
            {
                lessonId: 26,
                studentId: 12
            },
            {
                lessonId: 26,
                studentId: 13
            },
            {
                lessonId: 26,
                studentId: 14
            },
            {
                lessonId: 27,
                studentId: 8
            },
            {
                lessonId: 27,
                studentId: 9
            },
            {
                lessonId: 27,
                studentId: 10
            },
            {
                lessonId: 27,
                studentId: 11
            },
            {
                lessonId: 27,
                studentId: 12
            },
            {
                lessonId: 27,
                studentId: 13
            },
            {
                lessonId: 27,
                studentId: 14
            },
            {
                lessonId: 13,
                studentId: 8
            },
            {
                lessonId: 13,
                studentId: 9
            },
            {
                lessonId: 13,
                studentId: 10
            },
            {
                lessonId: 13,
                studentId: 11
            },
            {
                lessonId: 13,
                studentId: 12
            },
            {
                lessonId: 13,
                studentId: 13
            },
            {
                lessonId: 13,
                studentId: 14
            },
            {
                lessonId: 14,
                studentId: 8
            },
            {
                lessonId: 14,
                studentId: 9
            },
            {
                lessonId: 14,
                studentId: 10
            },
            {
                lessonId: 14,
                studentId: 11
            },
            {
                lessonId: 14,
                studentId: 12
            },
            {
                lessonId: 14,
                studentId: 13
            },
            {
                lessonId: 14,
                studentId: 14
            },
            {
                lessonId: 15,
                studentId: 8
            },
            {
                lessonId: 15,
                studentId: 9
            },
            {
                lessonId: 15,
                studentId: 10
            },
            {
                lessonId: 15,
                studentId: 11
            },
            {
                lessonId: 15,
                studentId: 12
            },
            {
                lessonId: 15,
                studentId: 13
            },
            {
                lessonId: 15,
                studentId: 14
            },
            {
                lessonId: 19,
                studentId: 15
            },
            {
                lessonId: 19,
                studentId: 16
            },
            {
                lessonId: 19,
                studentId: 17
            },
            {
                lessonId: 19,
                studentId: 18
            },
            {
                lessonId: 19,
                studentId: 19
            },
            {
                lessonId: 19,
                studentId: 20
            },
            {
                lessonId: 19,
                studentId: 21
            },
            {
                lessonId: 20,
                studentId: 15
            },
            {
                lessonId: 20,
                studentId: 16
            },
            {
                lessonId: 20,
                studentId: 17
            },
            {
                lessonId: 20,
                studentId: 18
            },
            {
                lessonId: 20,
                studentId: 19
            },
            {
                lessonId: 20,
                studentId: 20
            },
            {
                lessonId: 20,
                studentId: 21
            },
            {
                lessonId: 21,
                studentId: 15
            },
            {
                lessonId: 21,
                studentId: 16
            },
            {
                lessonId: 21,
                studentId: 17
            },
            {
                lessonId: 21,
                studentId: 18
            },
            {
                lessonId: 21,
                studentId: 19
            },
            {
                lessonId: 21,
                studentId: 20
            },
            {
                lessonId: 21,
                studentId: 21
            },

        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "StudentLessons";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            lessonId: { [Op.between]: [1, 27] }
        })
    }
}
