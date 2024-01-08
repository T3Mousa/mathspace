'use strict';

const { Lesson, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker')


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
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Basic concepts and terminology in Algebra.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 1
            },
            {
                title: 'Linear Equations',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Solving and graphing linear equations.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 1
            },
            {
                title: 'Linear Systems of Equations',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Solving and graphing linear systems of equations.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 1
            },
            {
                title: 'Introduction to Algebra 1',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Basic concepts and terminology in Algebra.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 4
            },
            {
                title: 'Linear Equations',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Solving and graphing linear equations.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 4
            },
            {
                title: 'Linear Systems of Equations',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Solving and graphing linear systems of equations.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 4
            },
            {
                title: 'Introduction to Algebra 1',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Basic concepts and terminology in Algebra.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 9
            },
            {
                title: 'Linear Equations',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Solving and graphing linear equations.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 9
            },
            {
                title: 'Linear Systems of Equations',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Solving and graphing linear systems of equations.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 9
            },
            {
                title: 'Quadratic Equations',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Learn how to solve quadratic equations and analyze their graphs.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 2
            },
            {
                title: 'Polynomial Functions',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Study polynomial functions and their properties.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 2
            },
            {
                title: 'Rational Expressions',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Explore rational expressions and learn how to simplify them.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 2
            },
            {
                title: 'Quadratic Equations',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Learn how to solve quadratic equations and analyze their graphs.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 6
            },
            {
                title: 'Polynomial Functions',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Study polynomial functions and their properties.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 6
            },
            {
                title: 'Rational Expressions',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Explore rational expressions and learn how to simplify them.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 6
            },
            {
                title: 'Quadratic Equations',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Learn how to solve quadratic equations and analyze their graphs.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 7
            },
            {
                title: 'Polynomial Functions',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Study polynomial functions and their properties.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 7
            },
            {
                title: 'Rational Expressions',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Explore rational expressions and learn how to simplify them.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 7
            },
            {
                title: 'Introduction to Geometry',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Basic concepts, terminology, and overview of Geometry.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 3
            },
            {
                title: 'Properties of Triangles',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Exploring different types of triangles and their properties.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 3
            },
            {
                title: 'Circles and Their Properties',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Understanding circles and their mathematical properties.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 3
            },
            {
                title: 'Introduction to Geometry',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Basic concepts, terminology, and overview of Geometry.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 5
            },
            {
                title: 'Properties of Triangles',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Exploring different types of triangles and their properties.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 5
            },
            {
                title: 'Circles and Their Properties',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Understanding circles and their mathematical properties.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 5
            },
            {
                title: 'Introduction to Geometry',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Basic concepts, terminology, and overview of Geometry.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 8
            },
            {
                title: 'Properties of Triangles',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Exploring different types of triangles and their properties.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
                classId: 8
            },
            {
                title: 'Circles and Their Properties',
                lessonImg: faker.image.urlLoremFlickr({ category: 'abstract' }),
                description: 'Understanding circles and their mathematical properties.' + faker.lorem.sentences({ min: 4, max: 6 }),
                lessonContent: faker.lorem.paragraphs({ min: 4, max: 8 }),
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
