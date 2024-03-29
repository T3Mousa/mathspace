'use strict';

let options = {};
options.tableName = "Lessons";
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
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
                // unique: true
            },
            lessonImg: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: ""
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
                defaultValue: ""
            },
            lessonContent: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: ""
            },
            teacherId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Teachers', schema: options.schema },
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
