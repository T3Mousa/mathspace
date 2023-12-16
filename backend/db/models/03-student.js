'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Student.belongsTo(models.User, { foreignKey: 'userId' })
            Student.hasMany(models.ClassEnrollment, { foreignKey: 'studentId', onDelete: 'cascade', hooks: 'true' })
            Student.belongsToMany(models.Class, { through: models.ClassEnrollment, foreignKey: 'classId', otherKey: 'studentId' })
            Student.hasMany(models.StudentLesson, { foreignKey: 'studentId', onDelete: 'cascade', hooks: 'true' })
            Student.belongsToMany(models.Lesson, { through: models.StudentLesson, foreignKey: 'lessonId', otherKey: 'studentId' })
            Student.hasMany(models.Grade, { foreignKey: 'studentId', onDelete: 'cascade', hooks: 'true' })
            Student.belongsToMany(models.Assignment, { through: models.Grade, foreignKey: 'assignmentId', otherKey: 'studentId' })
        }
    }
    Student.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Student',
    });
    return Student;
};
