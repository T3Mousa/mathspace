'use strict';

const { Class, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


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
                name: 'Algebra 1 - Period 1',
                classImg: '',
                description: 'Algebra 1 introduces variables, algebraic expressions, equations, inequalities, functions, and all their multiple representations.',
                teacherId: 1
            },
            {
                name: 'Algebra 2 - Period 2',
                classImg: '',
                description: 'Algebra 2 covers real numbers, operations, and patterns. As well as matrices, complex numbers, logarithms, polynomial equations and inequalities, transformations, mathematical models, scatter plots, and statistics.',
                teacherId: 1
            },
            {
                name: 'Geometry - Period 3',
                classImg: '',
                description: 'Geometry covers various concepts, including coordinate and spatial geometry, introductory trigonometry, angles, parallel lines, congruent and similar triangles, polygons and other figures, circles, the Pythagorean Theorem, etc.',
                teacherId: 1
            },
            {
                name: 'Algebra 1 - Period 1',
                classImg: '',
                description: 'Algebra 1 introduces variables, algebraic expressions, equations, inequalities, functions, and all their multiple representations.',
                teacherId: 2
            },
            {
                name: 'Geometry - Period 2',
                classImg: '',
                description: 'Geometry covers various concepts, including coordinate and spatial geometry, introductory trigonometry, angles, parallel lines, congruent and similar triangles, polygons and other figures, circles, the Pythagorean Theorem, etc.',
                teacherId: 2
            },
            {
                name: 'Algebra 2 - Period 3',
                classImg: '',
                description: 'Algebra 2 covers real numbers, operations, and patterns. As well as matrices, complex numbers, logarithms, polynomial equations and inequalities, transformations, mathematical models, scatter plots, and statistics.',
                teacherId: 2
            },
            {
                name: 'Algebra 2 - Period 1',
                classImg: '',
                description: 'Algebra 2 covers real numbers, operations, and patterns. As well as matrices, complex numbers, logarithms, polynomial equations and inequalities, transformations, mathematical models, scatter plots, and statistics.',
                teacherId: 3
            },
            {
                name: 'Geometry - Period 2',
                classImg: '',
                description: 'Geometry covers various concepts, including coordinate and spatial geometry, introductory trigonometry, angles, parallel lines, congruent and similar triangles, polygons and other figures, circles, the Pythagorean Theorem, etc.',
                teacherId: 3
            },
            {
                name: 'Algebra 1 - Period 3',
                classImg: '',
                description: 'Algebra 1 introduces variables, algebraic expressions, equations, inequalities, functions, and all their multiple representations.',
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
