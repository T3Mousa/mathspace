'use strict';

const { ClassLesson, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'ClassLessons';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "ClassLessons";
        return queryInterface.bulkInsert(options, [
            {
                lessonId: 1,
                classId: 1
            },
            {
                lessonId: 2,
                classId: 1
            },
            {
                lessonId: 3,
                classId: 1
            },
            {
                lessonId: 1,
                classId: 2
            },
            {
                lessonId: 2,
                classId: 2
            },
            {
                lessonId: 3,
                classId: 2
            },
            {
                lessonId: 4,
                classId: 4
            },
            {
                lessonId: 5,
                classId: 4
            },
            {
                lessonId: 6,
                classId: 4
            },
            {
                lessonId: 4,
                classId: 6
            },
            {
                lessonId: 5,
                classId: 6
            },
            {
                lessonId: 6,
                classId: 6
            },
            {
                lessonId: 7,
                classId: 7
            },
            {
                lessonId: 8,
                classId: 7
            },
            {
                lessonId: 9,
                classId: 7
            },
            {
                lessonId: 7,
                classId: 9
            },
            {
                lessonId: 8,
                classId: 9
            },
            {
                lessonId: 9,
                classId: 9
            },
            {
                lessonId: 10,
                classId: 1
            },
            {
                lessonId: 11,
                classId: 1
            },
            {
                lessonId: 12,
                classId: 1
            },
            {
                lessonId: 10,
                classId: 2
            },
            {
                lessonId: 11,
                classId: 2
            },
            {
                lessonId: 12,
                classId: 2
            },
            {
                lessonId: 13,
                classId: 4
            },
            {
                lessonId: 14,
                classId: 4
            },
            {
                lessonId: 15,
                classId: 4
            },
            {
                lessonId: 13,
                classId: 6
            },
            {
                lessonId: 14,
                classId: 6
            },
            {
                lessonId: 15,
                classId: 6
            },
            {
                lessonId: 16,
                classId: 7
            },
            {
                lessonId: 17,
                classId: 7
            },
            {
                lessonId: 18,
                classId: 7
            },
            {
                lessonId: 16,
                classId: 9
            },
            {
                lessonId: 17,
                classId: 9
            },
            {
                lessonId: 18,
                classId: 9
            },
            {
                lessonId: 19,
                classId: 3
            },
            {
                lessonId: 20,
                classId: 3
            },
            {
                lessonId: 21,
                classId: 3
            },
            {
                lessonId: 22,
                classId: 5
            },
            {
                lessonId: 23,
                classId: 5
            },
            {
                lessonId: 24,
                classId: 5
            },
            {
                lessonId: 25,
                classId: 8
            },
            {
                lessonId: 26,
                classId: 8
            },
            {
                lessonId: 27,
                classId: 8
            },

        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "ClassLessons";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            lessonId: { [Op.between]: [1, 27] }
        })
    }
}
