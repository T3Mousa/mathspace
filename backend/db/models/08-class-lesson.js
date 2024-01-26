'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassLesson extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ClassLesson.belongsTo(models.Lesson, { foreignKey: 'lessonId' })
            ClassLesson.belongsTo(models.Class, { foreignKey: 'classId' })
        }
    }
    ClassLesson.init({
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'ClassLesson',
    });
    return ClassLesson;
};
