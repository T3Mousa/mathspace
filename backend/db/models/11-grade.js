'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Grade extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Grade.belongsTo(models.Assignment, { foreignKey: 'assignmentId' })
            Grade.belongsTo(models.Student, { foreignKey: 'studentId' })
        }
    }
    Grade.init({
        assignmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        grade: {
            type: DataTypes.DECIMAL(4, 2),
            allowNull: true,
            validate: {
                min: 0,
                max: 100
            }
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Grade',
    });
    return Grade;
};
