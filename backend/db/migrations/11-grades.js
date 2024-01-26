'use strict';

let options = {};
options.tableName = "Grades";
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
            assignmentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Assignments', schema: options.schema },
                onDelete: 'CASCADE'
            },
            studentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Students', schema: options.schema },
                onDelete: 'CASCADE'
            },
            grade: {
                type: Sequelize.DECIMAL(5, 2),
                allowNull: true,
            },
            isCompleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
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
