'use strict';

const { Class, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker')


let options = {};
options.tableName = 'Classes';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Classes";
        return queryInterface.bulkInsert(options, [
            {
                name: 'Algebra - Period 1',
                classImg: faker.image.urlLoremFlickr({ category: 'nature' }),
                description: 'Algebra 1 introduces variables, algebraic expressions, equations, inequalities, functions, and all their multiple representations.' + faker.lorem.sentences({ min: 2, max: 4 }),
                teacherId: 1
            },
            {
                name: 'Algebra - Period 2',
                classImg: faker.image.urlLoremFlickr({ category: 'nature' }),
                description: 'Algebra 2 covers real numbers, operations, and patterns. As well as matrices, complex numbers, logarithms, polynomial equations and inequalities, transformations, mathematical models, scatter plots, and statistics.' + faker.lorem.sentences({ min: 2, max: 4 }),
                teacherId: 1
            },
            {
                name: 'Geometry - Period 3',
                classImg: faker.image.urlLoremFlickr({ category: 'nature' }),
                description: 'Geometry covers various concepts, including coordinate and spatial geometry, introductory trigonometry, angles, parallel lines, congruent and similar triangles, polygons and other figures, circles, the Pythagorean Theorem, etc.' + faker.lorem.sentences({ min: 2, max: 4 }),
                teacherId: 1
            },
            {
                name: 'Algebra - Period 1',
                classImg: faker.image.urlLoremFlickr({ category: 'nature' }),
                description: 'Algebra 1 introduces variables, algebraic expressions, equations, inequalities, functions, and all their multiple representations.' + faker.lorem.sentences({ min: 2, max: 4 }),
                teacherId: 2
            },
            {
                name: 'Geometry - Period 2',
                classImg: faker.image.urlLoremFlickr({ category: 'nature' }),
                description: 'Geometry covers various concepts, including coordinate and spatial geometry, introductory trigonometry, angles, parallel lines, congruent and similar triangles, polygons and other figures, circles, the Pythagorean Theorem, etc.' + faker.lorem.sentences({ min: 2, max: 4 }),
                teacherId: 2
            },
            {
                name: 'Algebra - Period 3',
                classImg: faker.image.urlLoremFlickr({ category: 'nature' }),
                description: 'Algebra 2 covers real numbers, operations, and patterns. As well as matrices, complex numbers, logarithms, polynomial equations and inequalities, transformations, mathematical models, scatter plots, and statistics.' + faker.lorem.sentences({ min: 2, max: 4 }),
                teacherId: 2
            },
            {
                name: 'Algebra - Period 1',
                classImg: faker.image.urlLoremFlickr({ category: 'nature' }),
                description: 'Algebra 2 covers real numbers, operations, and patterns. As well as matrices, complex numbers, logarithms, polynomial equations and inequalities, transformations, mathematical models, scatter plots, and statistics.' + faker.lorem.sentences({ min: 2, max: 4 }),
                teacherId: 3
            },
            {
                name: 'Geometry - Period 2',
                classImg: faker.image.urlLoremFlickr({ category: 'nature' }),
                description: 'Geometry covers various concepts, including coordinate and spatial geometry, introductory trigonometry, angles, parallel lines, congruent and similar triangles, polygons and other figures, circles, the Pythagorean Theorem, etc.' + faker.lorem.sentences({ min: 2, max: 4 }),
                teacherId: 3
            },
            {
                name: 'Algebra - Period 3',
                classImg: faker.image.urlLoremFlickr({ category: 'nature' }),
                description: 'Algebra 1 introduces variables, algebraic expressions, equations, inequalities, functions, and all their multiple representations.' + faker.lorem.sentences({ min: 2, max: 4 }),
                teacherId: 3
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Classes";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            teacherId: { [Op.in]: [1, 2, 3] }
        })
    }
}
