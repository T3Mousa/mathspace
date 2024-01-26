'use strict';

let options = {};
options.tableName = "ClassEnrollments";
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
            classId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Classes', schema: options.schema },
                onDelete: 'CASCADE'
            },
            studentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Students', schema: options.schema },
                onDelete: 'CASCADE'
            },
        }, options);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable(options);
    }
};
