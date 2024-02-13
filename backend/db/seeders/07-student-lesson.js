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
                lessonId: 10,
                studentId: 1
            },
            {
                lessonId: 10,
                studentId: 2
            },
            {
                lessonId: 10,
                studentId: 3
            },
            {
                lessonId: 10,
                studentId: 4
            },
            {
                lessonId: 10,
                studentId: 5
            },
            {
                lessonId: 10,
                studentId: 6
            },
            {
                lessonId: 10,
                studentId: 7
            },
            {
                lessonId: 11,
                studentId: 1
            },
            {
                lessonId: 11,
                studentId: 2
            },
            {
                lessonId: 11,
                studentId: 3
            },
            {
                lessonId: 11,
                studentId: 4
            },
            {
                lessonId: 11,
                studentId: 5
            },
            {
                lessonId: 11,
                studentId: 6
            },
            {
                lessonId: 11,
                studentId: 7
            },
            {
                lessonId: 12,
                studentId: 1
            },
            {
                lessonId: 12,
                studentId: 2
            },
            {
                lessonId: 12,
                studentId: 3
            },
            {
                lessonId: 12,
                studentId: 4
            },
            {
                lessonId: 12,
                studentId: 5
            },
            {
                lessonId: 12,
                studentId: 6
            },
            {
                lessonId: 12,
                studentId: 7
            },
            {
                lessonId: 22,
                studentId: 1
            },
            {
                lessonId: 22,
                studentId: 2
            },
            {
                lessonId: 22,
                studentId: 3
            },
            {
                lessonId: 22,
                studentId: 4
            },
            {
                lessonId: 22,
                studentId: 5
            },
            {
                lessonId: 22,
                studentId: 6
            },
            {
                lessonId: 22,
                studentId: 7
            },
            {
                lessonId: 23,
                studentId: 1
            },
            {
                lessonId: 23,
                studentId: 2
            },
            {
                lessonId: 23,
                studentId: 3
            },
            {
                lessonId: 23,
                studentId: 4
            },
            {
                lessonId: 23,
                studentId: 5
            },
            {
                lessonId: 23,
                studentId: 6
            },
            {
                lessonId: 23,
                studentId: 7
            },
            {
                lessonId: 24,
                studentId: 1
            },
            {
                lessonId: 24,
                studentId: 2
            },
            {
                lessonId: 24,
                studentId: 3
            },
            {
                lessonId: 24,
                studentId: 4
            },
            {
                lessonId: 24,
                studentId: 5
            },
            {
                lessonId: 24,
                studentId: 6
            },
            {
                lessonId: 24,
                studentId: 7
            },
            {
                lessonId: 4,
                studentId: 15
            },
            {
                lessonId: 4,
                studentId: 16
            },
            {
                lessonId: 4,
                studentId: 17
            },
            {
                lessonId: 4,
                studentId: 18
            },
            {
                lessonId: 4,
                studentId: 19
            },
            {
                lessonId: 4,
                studentId: 20
            },
            {
                lessonId: 4,
                studentId: 21
            },
            {
                lessonId: 5,
                studentId: 15
            },
            {
                lessonId: 5,
                studentId: 16
            },
            {
                lessonId: 5,
                studentId: 17
            },
            {
                lessonId: 5,
                studentId: 18
            },
            {
                lessonId: 5,
                studentId: 19
            },
            {
                lessonId: 5,
                studentId: 20
            },
            {
                lessonId: 5,
                studentId: 21
            },
            {
                lessonId: 6,
                studentId: 15
            },
            {
                lessonId: 6,
                studentId: 16
            },
            {
                lessonId: 6,
                studentId: 17
            },
            {
                lessonId: 6,
                studentId: 18
            },
            {
                lessonId: 6,
                studentId: 19
            },
            {
                lessonId: 6,
                studentId: 20
            },
            {
                lessonId: 6,
                studentId: 21
            },
            {
                lessonId: 13,
                studentId: 15
            },
            {
                lessonId: 13,
                studentId: 16
            },
            {
                lessonId: 13,
                studentId: 17
            },
            {
                lessonId: 13,
                studentId: 18
            },
            {
                lessonId: 13,
                studentId: 19
            },
            {
                lessonId: 13,
                studentId: 20
            },
            {
                lessonId: 13,
                studentId: 21
            },
            {
                lessonId: 14,
                studentId: 15
            },
            {
                lessonId: 14,
                studentId: 16
            },
            {
                lessonId: 14,
                studentId: 17
            },
            {
                lessonId: 14,
                studentId: 18
            },
            {
                lessonId: 14,
                studentId: 19
            },
            {
                lessonId: 14,
                studentId: 20
            },
            {
                lessonId: 14,
                studentId: 21
            },
            {
                lessonId: 15,
                studentId: 15
            },
            {
                lessonId: 15,
                studentId: 16
            },
            {
                lessonId: 15,
                studentId: 17
            },
            {
                lessonId: 15,
                studentId: 18
            },
            {
                lessonId: 15,
                studentId: 19
            },
            {
                lessonId: 15,
                studentId: 20
            },
            {
                lessonId: 15,
                studentId: 21
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
