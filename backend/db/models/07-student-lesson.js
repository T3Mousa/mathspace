'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StudentLesson extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            StudentLesson.belongsTo(models.Lesson, { foreignKey: 'lessonId' })
            StudentLesson.belongsTo(models.Student, { foreignKey: 'studentId' })
        }
    }
    StudentLesson.init({
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'StudentLesson',
    });
    return StudentLesson;
};
