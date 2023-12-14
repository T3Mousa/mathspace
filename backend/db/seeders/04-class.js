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
                description: 'Algebra 1 introduces students to variables, algebraic expressions, equations, inequalities, functions, and all their multiple representations. In this class, students will develop the ability to explore and solve real-world application problems, demonstrate the appropriate use of graphing calculators, and communicate mathematical ideas clearly. This course lays the foundation for mathematical literacy that will help students be successful in everysubsequent course in mathematics.',
                teacherId: 1
            },
            {
                name: 'Algebra 2 - Period 2',
                classImg: '',
                description: 'Algebra II is	intended to	help students enrich their skills and develop more concepts	beyond basic algebra as	they prepare for	higher level mathematic	courses. This course is	designed to	help students apply the mathematics they learned in	the	classroom to real world situations,	model mathematical situations, communicate mathematically,	and use	technology appropriately. Lessons that connect various	areas	of	mathematics	to algebra, geometry, statistics and trigonometry will be studied. Students will study real numbers, operations, and patterns as they extend their understanding of algebraic concepts. They will work with matrices, complex numbers, logarithms, polynomial equations and inequalities, transformations, mathematical models, scatter plots, and statistics.',
                teacherId: 1
            },
            {
                name: 'Geometry - Period 3',
                classImg: '',
                description: 'This course will cover various Geometry topics and principles, including coordinate and spatial geometry, introductory trigonometry, angles, parallel lines, congruent and similar triangles, polygons and other figures, circles, the Pythagorean Theorem, etc. We will also focus on problems that serve to review our Algebra skills and continue to develop our critical thinking skills through various problem-solving and real-world situations.',
                teacherId: 1
            },
            {
                name: 'Algebra 1 - Period 1',
                classImg: '',
                description: 'Algebra 1 introduces students to variables, algebraic expressions, equations, inequalities, functions, and all their multiple representations. In this class, students will develop the ability to explore and solve real-world application problems, demonstrate the appropriate use of graphing calculators, and communicate mathematical ideas clearly. This course lays the foundation for mathematical literacy that will help students be successful in everysubsequent course in mathematics.',
                teacherId: 2
            },
            {
                name: 'Geometry - Period 2',
                classImg: '',
                description: 'This course will cover various Geometry topics and principles, including coordinate and spatial geometry, introductory trigonometry, angles, parallel lines, congruent and similar triangles, polygons and other figures, circles, the Pythagorean Theorem, etc. We will also focus on problems that serve to review our Algebra skills and continue to develop our critical thinking skills through various problem-solving and real-world situations.',
                teacherId: 2
            },
            {
                name: 'Algebra 2 - Period 3',
                classImg: '',
                description: 'Algebra II is	intended to	help students enrich their skills and develop more concepts	beyond basic algebra as	they prepare for	higher level mathematic	courses. This course is	designed to	help students apply the mathematics they learned in	the	classroom to real world situations,	model mathematical situations, communicate mathematically,	and use	technology appropriately. Lessons that connect various	areas	of	mathematics	to algebra, geometry, statistics and trigonometry will be studied. Students will study real numbers, operations, and patterns as they extend their understanding of algebraic concepts. They will work with matrices, complex numbers, logarithms, polynomial equations and inequalities, transformations, mathematical models, scatter plots, and statistics.',
                teacherId: 2
            },
            {
                name: 'Algebra 2 - Period 1',
                classImg: '',
                description: 'Algebra II is	intended to	help students enrich their skills and develop more concepts	beyond basic algebra as	they prepare for	higher level mathematic	courses. This course is	designed to	help students apply the mathematics they learned in	the	classroom to real world situations,	model mathematical situations, communicate mathematically,	and use	technology appropriately. Lessons that connect various	areas	of	mathematics	to algebra, geometry, statistics and trigonometry will be studied. Students will study real numbers, operations, and patterns as they extend their understanding of algebraic concepts. They will work with matrices, complex numbers, logarithms, polynomial equations and inequalities, transformations, mathematical models, scatter plots, and statistics.',
                teacherId: 3
            },
            {
                name: 'Geometry - Period 2',
                classImg: '',
                description: 'This course will cover various Geometry topics and principles, including coordinate and spatial geometry, introductory trigonometry, angles, parallel lines, congruent and similar triangles, polygons and other figures, circles, the Pythagorean Theorem, etc. We will also focus on problems that serve to review our Algebra skills and continue to develop our critical thinking skills through various problem-solving and real-world situations.',
                teacherId: 3
            },
            {
                name: 'Algebra 1 - Period 3',
                classImg: '',
                description: 'Algebra 1 introduces students to variables, algebraic expressions, equations, inequalities, functions, and all their multiple representations. In this class, students will develop the ability to explore and solve real-world application problems, demonstrate the appropriate use of graphing calculators, and communicate mathematical ideas clearly. This course lays the foundation for mathematical literacy that will help students be successful in everysubsequent course in mathematics.',
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
