'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Lesson extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Lesson.belongsTo(models.Class, { foreignKey: 'classId' })
            Lesson.hasMany(models.StudentLesson, { foreignKey: 'lessonId', onDelete: 'cascade', hooks: 'true' })
            Lesson.belongsToMany(models.Student, { through: models.StudentLesson, foreignKey: 'studentId', otherKey: 'lessonId' })
        }
    }
    Lesson.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 50]
            }
        },
        lessonImg: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        lessonContent: {
            type: DataTypes.BLOB,
            allowNull: false,
            defaultValue: ''
        },
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Lesson',
    });
    return Lesson;
};
