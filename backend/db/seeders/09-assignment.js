'use strict';

const { Assignment, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


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
                assignmentContent: '',
                dueDate: "2023-09-08",
                // classId: 1
                teacherId: 1
            },
            {
                title: 'Solving Systems of Equations',
                description: 'Practice solving systems of linear equations graphically and algebraically.',
                assignmentContent: '',
                dueDate: "2024-03-08",
                // classId: 1
                teacherId: 1
            },
            {
                title: 'Solving Linear Equations',
                description: 'Practice solving basic linear equations with one variable.',
                assignmentContent: '',
                dueDate: "2023-09-08",
                // classId: 4
                teacherId: 2
            },
            {
                title: 'Solving Systems of Equations',
                description: 'Practice solving systems of linear equations graphically and algebraically.',
                assignmentContent: '',
                dueDate: "2024-03-08",
                // classId: 4
                teacherId: 2
            },
            {
                title: 'Solving Linear Equations',
                description: 'Practice solving basic linear equations with one variable.',
                assignmentContent: '',
                dueDate: "2023-09-08",
                // classId: 9
                teacherId: 3
            },
            {
                title: 'Solving Systems of Equations',
                description: 'Practice solving systems of linear equations graphically and algebraically.',
                assignmentContent: '',
                dueDate: "2024-03-08",
                // classId: 9
                teacherId: 3
            },
            {
                title: 'Solving Quadratic Equations',
                description: 'Practice solving quadratic equations and graphing parabolas.',
                assignmentContent: '',
                dueDate: "2023-09-01",
                // classId: 2
                teacherId: 1
            },
            {
                title: 'Properties of Polynomial Functions',
                description: 'Practice identifying properties of polynomial functions graphically and algebraically.',
                assignmentContent: '',
                dueDate: "2024-03-08",
                // classId: 2
                teacherId: 1
            },
            {
                title: 'Solving Quadratic Equations',
                description: 'Practice solving quadratic equations and graphing parabolas.',
                assignmentContent: '',
                dueDate: "2023-09-01",
                // classId: 6
                teacherId: 2
            },
            {
                title: 'Properties of Polynomial Functions',
                description: 'Practice identifying properties of polynomial functions graphically and algebraically.',
                assignmentContent: '',
                dueDate: "2024-03-08",
                // classId: 6
                teacherId: 2
            },
            {
                title: 'Solving Quadratic Equations',
                description: 'Practice solving quadratic equations and graphing parabolas.',
                assignmentContent: '',
                dueDate: "2023-09-01",
                // classId: 7
                teacherId: 3
            },
            {
                title: 'Properties of Polynomial Functions',
                description: 'Practice identifying properties of polynomial functions graphically and algebraically.',
                assignmentContent: '',
                dueDate: "2024-03-08",
                // classId: 7
                teacherId: 3
            },
            {
                title: 'Introduction to Shapes and Figures',
                description: 'Explore basic 2D geometric shapes and 3D figures and their properties.',
                assignmentContent: '',
                dueDate: "2023-09-15",
                // classId: 3
                teacherId: 1
            },
            {
                title: 'Finding Area and Perimeter',
                description: 'Calculate area and perimeter for basic 2D geometric shapes.',
                assignmentContent: '',
                dueDate: "2023-09-30",
                // classId: 3
                teacherId: 1
            },
            {
                title: 'Finding Volume',
                description: 'Calculate volume for basic 3D geometric figures.',
                assignmentContent: '',
                dueDate: "2024-03-08",
                // classId: 3
                teacherId: 1
            },
            {
                title: 'Introduction to Shapes and Figures',
                description: 'Explore basic 2D geometric shapes and 3D figures and their properties.',
                assignmentContent: '',
                dueDate: "2023-09-15",
                // classId: 5
                teacherId: 2
            },
            {
                title: 'Finding Area and Perimeter',
                description: 'Calculate area and perimeter for basic 2D geometric shapes.',
                assignmentContent: '',
                dueDate: "2023-09-30",
                // classId: 5
                teacherId: 2
            },
            {
                title: 'Finding Volume',
                description: 'Calculate volume for basic 3D geometric figures.',
                assignmentContent: '',
                dueDate: "2024-03-08",
                // classId: 5
                teacherId: 2
            },
            {
                title: 'Introduction to Shapes and Figures',
                description: 'Explore basic 2D geometric shapes and 3D figures and their properties.',
                assignmentContent: '',
                dueDate: "2023-09-15",
                // classId: 8
                teacherId: 3
            },
            {
                title: 'Finding Area and Perimeter',
                description: 'Calculate area and perimeter for basic 2D geometric shapes.',
                assignmentContent: '',
                dueDate: "2023-09-30",
                // classId: 8
                teacherId: 3
            },
            {
                title: 'Finding Volume',
                description: 'Calculate volume for basic 3D geometric figures.',
                assignmentContent: '',
                dueDate: "2024-03-08",
                // classId: 8
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
