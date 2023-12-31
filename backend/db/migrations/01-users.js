'use strict';

let options = {};
options.tableName = "Users";
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
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            profileImg: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: ""
            },
            userRole: {
                type: Sequelize.ENUM('teacher', 'student'),
                allowNull: false
            },
            username: {
                type: Sequelize.STRING(30),
                allowNull: true
            },
            email: {
                type: Sequelize.STRING(256),
                allowNull: false,
                unique: true
            },
            hashedPassword: {
                type: Sequelize.STRING.BINARY,
                allowNull: false
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
