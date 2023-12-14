'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassEnrollment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ClassEnrollment.belongsTo(models.Class, { foreignKey: 'classId' })
            ClassEnrollment.belongsTo(models.Student, { foreignKey: 'studentId' })
        }
    }
    ClassEnrollment.init({
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'ClassEnrollment',
    });
    return ClassEnrollment;
};
