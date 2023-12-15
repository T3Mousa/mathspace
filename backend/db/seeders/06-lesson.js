'use strict';

const { Lesson, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Lessons';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Lessons";
        return queryInterface.bulkInsert(options, [
            {
                title: 'Introduction to Algebra 1',
                lessonImg: '',
                description: 'Basic concepts and terminology in Algebra.',
                lessonContent: '',
                classId: 1
            },
            {
                title: 'Linear Equations',
                lessonImg: '',
                description: 'Solving and graphing linear equations.',
                lessonContent: '',
                classId: 1
            },
            {
                title: 'Linear Systems of Equations',
                lessonImg: '',
                description: 'Solving and graphing linear systems of equations.',
                lessonContent: '',
                classId: 1
            },
            {
                title: 'Introduction to Algebra 1',
                lessonImg: '',
                description: 'Basic concepts and terminology in Algebra.',
                lessonContent: '',
                classId: 4
            },
            {
                title: 'Linear Equations',
                lessonImg: '',
                description: 'Solving and graphing linear equations.',
                lessonContent: '',
                classId: 4
            },
            {
                title: 'Linear Systems of Equations',
                lessonImg: '',
                description: 'Solving and graphing linear systems of equations.',
                lessonContent: '',
                classId: 4
            },
            {
                title: 'Introduction to Algebra 1',
                lessonImg: '',
                description: 'Basic concepts and terminology in Algebra.',
                lessonContent: '',
                classId: 9
            },
            {
                title: 'Linear Equations',
                lessonImg: '',
                description: 'Solving and graphing linear equations.',
                lessonContent: '',
                classId: 9
            },
            {
                title: 'Linear Systems of Equations',
                lessonImg: '',
                description: 'Solving and graphing linear systems of equations.',
                lessonContent: '',
                classId: 9
            },
            {
                title: 'Quadratic Equations',
                lessonImg: '',
                description: 'Learn how to solve quadratic equations and analyze their graphs.',
                lessonContent: '',
                classId: 2
            },
            {
                title: 'Polynomial Functions',
                lessonImg: '',
                description: 'Study polynomial functions and their properties.',
                lessonContent: '',
                classId: 2
            },
            {
                title: 'Rational Expressions',
                lessonImg: '',
                description: 'Explore rational expressions and learn how to simplify them.',
                lessonContent: '',
                classId: 2
            },
            {
                title: 'Quadratic Equations',
                lessonImg: '',
                description: 'Learn how to solve quadratic equations and analyze their graphs.',
                lessonContent: '',
                classId: 6
            },
            {
                title: 'Polynomial Functions',
                lessonImg: '',
                description: 'Study polynomial functions and their properties.',
                lessonContent: '',
                classId: 6
            },
            {
                title: 'Rational Expressions',
                lessonImg: '',
                description: 'Explore rational expressions and learn how to simplify them.',
                lessonContent: '',
                classId: 6
            },
            {
                title: 'Quadratic Equations',
                lessonImg: '',
                description: 'Learn how to solve quadratic equations and analyze their graphs.',
                lessonContent: '',
                classId: 7
            },
            {
                title: 'Polynomial Functions',
                lessonImg: '',
                description: 'Study polynomial functions and their properties.',
                lessonContent: '',
                classId: 7
            },
            {
                title: 'Rational Expressions',
                lessonImg: '',
                description: 'Explore rational expressions and learn how to simplify them.',
                lessonContent: '',
                classId: 7
            },
            {
                title: 'Introduction to Geometry',
                lessonImg: '',
                description: 'Basic concepts, terminology, and overview of Geometry.',
                lessonContent: '',
                classId: 3
            },
            {
                title: 'Properties of Triangles',
                lessonImg: '',
                description: 'Exploring different types of triangles and their properties.',
                lessonContent: '',
                classId: 3
            },
            {
                title: 'Circles and Their Properties',
                lessonImg: '',
                description: 'Understanding circles and their mathematical properties.',
                lessonContent: '',
                classId: 3
            },
            {
                title: 'Introduction to Geometry',
                lessonImg: '',
                description: 'Basic concepts, terminology, and overview of Geometry.',
                lessonContent: '',
                classId: 5
            },
            {
                title: 'Properties of Triangles',
                lessonImg: '',
                description: 'Exploring different types of triangles and their properties.',
                lessonContent: '',
                classId: 5
            },
            {
                title: 'Circles and Their Properties',
                lessonImg: '',
                description: 'Understanding circles and their mathematical properties.',
                lessonContent: '',
                classId: 5
            },
            {
                title: 'Introduction to Geometry',
                lessonImg: '',
                description: 'Basic concepts, terminology, and overview of Geometry.',
                lessonContent: '',
                classId: 8
            },
            {
                title: 'Properties of Triangles',
                lessonImg: '',
                description: 'Exploring different types of triangles and their properties.',
                lessonContent: '',
                classId: 8
            },
            {
                title: 'Circles and Their Properties',
                lessonImg: '',
                description: 'Understanding circles and their mathematical properties.',
                lessonContent: '',
                classId: 8
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Classes";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            classId: { [Op.between]: [1, 9] }
        })
    }
}
