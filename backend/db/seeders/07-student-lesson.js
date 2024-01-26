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
                lessonId: 7,
                studentId: 8
            },
            {
                lessonId: 7,
                studentId: 9
            },
            {
                lessonId: 7,
                studentId: 10
            },
            {
                lessonId: 7,
                studentId: 11
            },
            {
                lessonId: 7,
                studentId: 12
            },
            {
                lessonId: 7,
                studentId: 13
            },
            {
                lessonId: 7,
                studentId: 14
            },
            {
                lessonId: 8,
                studentId: 8
            },
            {
                lessonId: 8,
                studentId: 9
            },
            {
                lessonId: 8,
                studentId: 10
            },
            {
                lessonId: 8,
                studentId: 11
            },
            {
                lessonId: 8,
                studentId: 12
            },
            {
                lessonId: 8,
                studentId: 13
            },
            {
                lessonId: 8,
                studentId: 14
            },
            {
                lessonId: 9,
                studentId: 8
            },
            {
                lessonId: 9,
                studentId: 9
            },
            {
                lessonId: 9,
                studentId: 10
            },
            {
                lessonId: 9,
                studentId: 11
            },
            {
                lessonId: 9,
                studentId: 12
            },
            {
                lessonId: 9,
                studentId: 13
            },
            {
                lessonId: 9,
                studentId: 14
            },
            {
                lessonId: 4,
                studentId: 8
            },
            {
                lessonId: 4,
                studentId: 9
            },
            {
                lessonId: 4,
                studentId: 10
            },
            {
                lessonId: 4,
                studentId: 11
            },
            {
                lessonId: 4,
                studentId: 12
            },
            {
                lessonId: 4,
                studentId: 13
            },
            {
                lessonId: 4,
                studentId: 14
            },
            {
                lessonId: 5,
                studentId: 8
            },
            {
                lessonId: 5,
                studentId: 9
            },
            {
                lessonId: 5,
                studentId: 10
            },
            {
                lessonId: 5,
                studentId: 11
            },
            {
                lessonId: 5,
                studentId: 12
            },
            {
                lessonId: 5,
                studentId: 13
            },
            {
                lessonId: 5,
                studentId: 14
            },
            {
                lessonId: 6,
                studentId: 8
            },
            {
                lessonId: 6,
                studentId: 9
            },
            {
                lessonId: 6,
                studentId: 10
            },
            {
                lessonId: 6,
                studentId: 11
            },
            {
                lessonId: 6,
                studentId: 12
            },
            {
                lessonId: 6,
                studentId: 13
            },
            {
                lessonId: 6,
                studentId: 14
            },
            {
                lessonId: 7,
                studentId: 15
            },
            {
                lessonId: 7,
                studentId: 16
            },
            {
                lessonId: 7,
                studentId: 17
            },
            {
                lessonId: 7,
                studentId: 18
            },
            {
                lessonId: 7,
                studentId: 19
            },
            {
                lessonId: 7,
                studentId: 20
            },
            {
                lessonId: 7,
                studentId: 21
            },
            {
                lessonId: 8,
                studentId: 15
            },
            {
                lessonId: 8,
                studentId: 16
            },
            {
                lessonId: 8,
                studentId: 17
            },
            {
                lessonId: 8,
                studentId: 18
            },
            {
                lessonId: 8,
                studentId: 19
            },
            {
                lessonId: 8,
                studentId: 20
            },
            {
                lessonId: 8,
                studentId: 21
            },
            {
                lessonId: 9,
                studentId: 15
            },
            {
                lessonId: 9,
                studentId: 16
            },
            {
                lessonId: 9,
                studentId: 17
            },
            {
                lessonId: 9,
                studentId: 18
            },
            {
                lessonId: 9,
                studentId: 19
            },
            {
                lessonId: 9,
                studentId: 20
            },
            {
                lessonId: 9,
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
