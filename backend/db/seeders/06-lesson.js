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
                lessonImg: 'https://debrabell.com/wp-content/uploads/2022/02/Algebra-1.png',
                description: 'Basic concepts and terminology in Algebra.',
                lessonContent: '',
                classId: 1
            },
            {
                title: 'Linear Equations',
                lessonImg: 'https://www.tiwariacademy.com/app/uploads/2020/06/Linear-Equation.png',
                description: 'Solving and graphing linear equations.',
                lessonContent: '',
                classId: 1
            },
            {
                title: 'Linear Systems of Equations',
                lessonImg: 'https://mathvault.ca/wp-content/uploads/Three-Lines.jpg',
                description: 'Solving and graphing linear systems of equations.',
                lessonContent: '',
                classId: 1
            },
            {
                title: 'Introduction to Algebra 1',
                lessonImg: 'https://debrabell.com/wp-content/uploads/2022/02/Algebra-1.png',
                description: 'Basic concepts and terminology in Algebra.',
                lessonContent: '',
                classId: 4
            },
            {
                title: 'Linear Equations',
                lessonImg: 'https://www.tiwariacademy.com/app/uploads/2020/06/Linear-Equation.png',
                description: 'Solving and graphing linear equations.',
                lessonContent: '',
                classId: 4
            },
            {
                title: 'Linear Systems of Equations',
                lessonImg: 'https://mathvault.ca/wp-content/uploads/Three-Lines.jpg',
                description: 'Solving and graphing linear systems of equations.',
                lessonContent: '',
                classId: 4
            },
            {
                title: 'Introduction to Algebra 1',
                lessonImg: 'https://debrabell.com/wp-content/uploads/2022/02/Algebra-1.png',
                description: 'Basic concepts and terminology in Algebra.',
                lessonContent: '',
                classId: 9
            },
            {
                title: 'Linear Equations',
                lessonImg: 'https://www.tiwariacademy.com/app/uploads/2020/06/Linear-Equation.png',
                description: 'Solving and graphing linear equations.',
                lessonContent: '',
                classId: 9
            },
            {
                title: 'Linear Systems of Equations',
                lessonImg: 'https://mathvault.ca/wp-content/uploads/Three-Lines.jpg',
                description: 'Solving and graphing linear systems of equations.',
                lessonContent: '',
                classId: 9
            },
            {
                title: 'Quadratic Equations',
                lessonImg: 'https://debrabell.com/wp-content/uploads/2022/02/Algebra-2.png',
                description: 'Learn how to solve quadratic equations and analyze their graphs.',
                lessonContent: '',
                classId: 2
            },
            {
                title: 'Polynomial Functions',
                lessonImg: 'https://slideplayer.com/4586972/15/images/slide_1.jpg',
                description: 'Study polynomial functions and their properties.',
                lessonContent: '',
                classId: 2
            },
            {
                title: 'Rational Expressions',
                lessonImg: 'https://i.pinimg.com/originals/12/ae/bb/12aebb728c22f2bc3ca659c2ab72ce64.jpg',
                description: 'Explore rational expressions and learn how to simplify them.',
                lessonContent: '',
                classId: 2
            },
            {
                title: 'Quadratic Equations',
                lessonImg: 'https://debrabell.com/wp-content/uploads/2022/02/Algebra-2.png',
                description: 'Learn how to solve quadratic equations and analyze their graphs.',
                lessonContent: '',
                classId: 6
            },
            {
                title: 'Polynomial Functions',
                lessonImg: 'https://slideplayer.com/4586972/15/images/slide_1.jpg',
                description: 'Study polynomial functions and their properties.',
                lessonContent: '',
                classId: 6
            },
            {
                title: 'Rational Expressions',
                lessonImg: 'https://i.pinimg.com/originals/12/ae/bb/12aebb728c22f2bc3ca659c2ab72ce64.jpg',
                description: 'Explore rational expressions and learn how to simplify them.',
                lessonContent: '',
                classId: 6
            },
            {
                title: 'Quadratic Equations',
                lessonImg: 'https://debrabell.com/wp-content/uploads/2022/02/Algebra-2.png',
                description: 'Learn how to solve quadratic equations and analyze their graphs.',
                lessonContent: '',
                classId: 7
            },
            {
                title: 'Polynomial Functions',
                lessonImg: 'https://slideplayer.com/4586972/15/images/slide_1.jpg',
                description: 'Study polynomial functions and their properties.',
                lessonContent: '',
                classId: 7
            },
            {
                title: 'Rational Expressions',
                lessonImg: 'https://i.pinimg.com/originals/12/ae/bb/12aebb728c22f2bc3ca659c2ab72ce64.jpg',
                description: 'Explore rational expressions and learn how to simplify them.',
                lessonContent: '',
                classId: 7
            },
            {
                title: 'Introduction to Geometry',
                lessonImg: 'https://cdn3.vectorstock.com/i/1000x1000/87/87/geometry-round-vector-15438787.jpg',
                description: 'Basic concepts, terminology, and overview of Geometry.',
                lessonContent: '',
                classId: 3
            },
            {
                title: 'Properties of Triangles',
                lessonImg: 'https://slideplayer.com/10920821/39/images/slide_1.jpg',
                description: 'Exploring different types of triangles and their properties.',
                lessonContent: '',
                classId: 3
            },
            {
                title: 'Circles and Their Properties',
                lessonImg: 'https://cdn1.byjus.com/wp-content/uploads/2020/10/Properties-of-Circle-2.png',
                description: 'Understanding circles and their mathematical properties.',
                lessonContent: '',
                classId: 3
            },
            {
                title: 'Introduction to Geometry',
                lessonImg: 'https://cdn3.vectorstock.com/i/1000x1000/87/87/geometry-round-vector-15438787.jpg',
                description: 'Basic concepts, terminology, and overview of Geometry.',
                lessonContent: '',
                classId: 5
            },
            {
                title: 'Properties of Triangles',
                lessonImg: 'https://slideplayer.com/10920821/39/images/slide_1.jpg',
                description: 'Exploring different types of triangles and their properties.',
                lessonContent: '',
                classId: 5
            },
            {
                title: 'Circles and Their Properties',
                lessonImg: 'https://cdn1.byjus.com/wp-content/uploads/2020/10/Properties-of-Circle-2.png',
                description: 'Understanding circles and their mathematical properties.',
                lessonContent: '',
                classId: 5
            },
            {
                title: 'Introduction to Geometry',
                lessonImg: 'https://cdn3.vectorstock.com/i/1000x1000/87/87/geometry-round-vector-15438787.jpg',
                description: 'Basic concepts, terminology, and overview of Geometry.',
                lessonContent: '',
                classId: 8
            },
            {
                title: 'Properties of Triangles',
                lessonImg: 'https://slideplayer.com/10920821/39/images/slide_1.jpg',
                description: 'Exploring different types of triangles and their properties.',
                lessonContent: '',
                classId: 8
            },
            {
                title: 'Circles and Their Properties',
                lessonImg: 'https://cdn1.byjus.com/wp-content/uploads/2020/10/Properties-of-Circle-2.png',
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
