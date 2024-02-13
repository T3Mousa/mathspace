'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassAssignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ClassAssignment.belongsTo(models.Assignment, { foreignKey: 'assignmentId' })
            ClassAssignment.belongsTo(models.Class, { foreignKey: 'classId' })
        }
    }
    ClassAssignment.init({
        assignmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'ClassAssignment',
    });
    return ClassAssignment;
};
