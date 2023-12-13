'use strict';

const { Student, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Students';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Students";
        return queryInterface.bulkInsert(options, [
            {
                userId: 4
            },
            {
                userId: 5
            },
            {
                userId: 6
            },
            {
                userId: 7
            },
            {
                userId: 8
            },
            {
                userId: 9
            },
            {
                userId: 10
            },
            {
                userId: 11
            },
            {
                userId: 12
            },
            {
                userId: 13
            },
            {
                userId: 14
            },
            {
                userId: 15
            },
            {
                userId: 16
            },
            {
                userId: 17
            },
            {
                userId: 18
            },
            {
                userId: 19
            },
            {
                userId: 20
            },
            {
                userId: 21
            },
            {
                userId: 22
            },
            {
                userId: 23
            },
            {
                userId: 24
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Students";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            userId: { [Op.between]: [4, 24] }
        })
    }
}
