'use strict';

let options = {};
options.tableName = "ClassLessons";
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(options, {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            lessonId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Lessons', schema: options.schema },
                onDelete: 'CASCADE'
            },
            classId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Classes', schema: options.schema },
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        }, options);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable(options);
    }
};
