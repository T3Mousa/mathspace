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
                lessonId: 1,
                classId: 2
            },
            {
                lessonId: 1,
                classId: 3
            },
            {
                lessonId: 2,
                classId: 1
            },
            {
                lessonId: 2,
                classId: 2
            },
            {
                lessonId: 2,
                classId: 3
            },
            {
                lessonId: 3,
                classId: 1
            },
            {
                lessonId: 3,
                classId: 2
            },
            {
                lessonId: 3,
                classId: 3
            },
            {
                lessonId: 4,
                classId: 4
            },
            {
                lessonId: 4,
                classId: 5
            },
            {
                lessonId: 4,
                classId: 6
            },
            {
                lessonId: 5,
                classId: 4
            },
            {
                lessonId: 5,
                classId: 5
            },
            {
                lessonId: 5,
                classId: 6
            },
            {
                lessonId: 6,
                classId: 4
            },
            {
                lessonId: 6,
                classId: 5
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
                lessonId: 7,
                classId: 8
            },
            {
                lessonId: 7,
                classId: 9
            },
            {
                lessonId: 8,
                classId: 7
            },
            {
                lessonId: 8,
                classId: 8
            },
            {
                lessonId: 8,
                classId: 9
            },
            {
                lessonId: 9,
                classId: 7
            },
            {
                lessonId: 9,
                classId: 8
            },
            {
                lessonId: 9,
                classId: 9
            },

        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "ClassLessons";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            lessonId: { [Op.between]: [1, 9] }
        })
    }
}
