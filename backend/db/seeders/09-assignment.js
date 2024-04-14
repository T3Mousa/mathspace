'use strict';

const { Assignment, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker')


let options = {};
options.tableName = 'Assignments';

if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;
}

module.exports = {


    up: async (queryInterface, Sequelize) => {
        options.tableName = "Assignments";
        return queryInterface.bulkInsert(options, [
            {
                title: 'Solving Linear Equations',
                description: 'Practice solving basic linear equations with one variable.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-08",
                teacherId: 1
            },
            {
                title: 'Solving Systems of Equations',
                description: 'Practice solving systems of linear equations graphically and algebraically.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2024-03-08",
                teacherId: 1
            },
            {
                title: 'Solving Linear Equations',
                description: 'Practice solving basic linear equations with one variable.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-08",
                teacherId: 2
            },
            {
                title: 'Solving Systems of Equations',
                description: 'Practice solving systems of linear equations graphically and algebraically.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2024-03-08",
                teacherId: 2
            },
            {
                title: 'Solving Linear Equations',
                description: 'Practice solving basic linear equations with one variable.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-08",
                teacherId: 3
            },
            {
                title: 'Solving Systems of Equations',
                description: 'Practice solving systems of linear equations graphically and algebraically.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2024-03-08",
                teacherId: 3
            },
            {
                title: 'Solving Quadratic Equations',
                description: 'Practice solving quadratic equations and graphing parabolas.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-01",
                teacherId: 1
            },
            {
                title: 'Properties of Polynomial Functions',
                description: 'Practice identifying properties of polynomial functions graphically and algebraically.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2024-03-08",
                teacherId: 1
            },
            {
                title: 'Solving Quadratic Equations',
                description: 'Practice solving quadratic equations and graphing parabolas.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-01",
                teacherId: 2
            },
            {
                title: 'Properties of Polynomial Functions',
                description: 'Practice identifying properties of polynomial functions graphically and algebraically.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2024-03-08",
                teacherId: 2
            },
            {
                title: 'Solving Quadratic Equations',
                description: 'Practice solving quadratic equations and graphing parabolas.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-01",
                teacherId: 3
            },
            {
                title: 'Properties of Polynomial Functions',
                description: 'Practice identifying properties of polynomial functions graphically and algebraically.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2024-03-08",
                teacherId: 3
            },
            {
                title: 'Introduction to Shapes and Figures',
                description: 'Explore basic 2D geometric shapes and 3D figures and their properties.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-15",
                teacherId: 1
            },
            {
                title: 'Finding Area and Perimeter',
                description: 'Calculate area and perimeter for basic 2D geometric shapes.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-30",
                teacherId: 1
            },
            {
                title: 'Finding Volume',
                description: 'Calculate volume for basic 3D geometric figures.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2024-03-08",
                teacherId: 1
            },
            {
                title: 'Introduction to Shapes and Figures',
                description: 'Explore basic 2D geometric shapes and 3D figures and their properties.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-15",
                teacherId: 2
            },
            {
                title: 'Finding Area and Perimeter',
                description: 'Calculate area and perimeter for basic 2D geometric shapes.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-30",
                teacherId: 2
            },
            {
                title: 'Finding Volume',
                description: 'Calculate volume for basic 3D geometric figures.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2024-03-08",
                teacherId: 2
            },
            {
                title: 'Introduction to Shapes and Figures',
                description: 'Explore basic 2D geometric shapes and 3D figures and their properties.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-15",
                teacherId: 3
            },
            {
                title: 'Finding Area and Perimeter',
                description: 'Calculate area and perimeter for basic 2D geometric shapes.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2023-09-30",
                teacherId: 3
            },
            {
                title: 'Finding Volume',
                description: 'Calculate volume for basic 3D geometric figures.',
                assignmentContent: faker.lorem.paragraphs({ min: 6, max: 12 }),
                dueDate: "2024-03-08",
                teacherId: 3
            },
        ], {})
    },



    down: async (queryInterface, Sequelize) => {
        options.tableName = "Assignments";
        const Op = Sequelize.Op;
        return queryInterface.bulkDelete(options, {
            teacherId: { [Op.between]: [1, 3] }
        })
    }
}
