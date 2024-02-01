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
            Lesson.belongsTo(models.Teacher, { foreignKey: 'teacherId' })
            Lesson.hasMany(models.StudentLesson, { foreignKey: 'lessonId', onDelete: 'cascade', hooks: 'true' })
            Lesson.belongsToMany(models.Student, { through: models.StudentLesson, foreignKey: 'studentId', otherKey: 'lessonId' })
            Lesson.hasMany(models.ClassLesson, { foreignKey: 'lessonId', onDelete: 'cascade', hooks: 'true' })
            Lesson.belongsToMany(models.Class, { through: models.ClassLesson, foreignKey: 'classId', otherKey: 'lessonId' })
        }
        addClass = async function (classId) {
            try {
                const existingAssociation = await this.hasClass(classId)
                if (existingAssociation) {
                    return;
                }
                await this.addClass(classId);
                return;
            } catch (err) {
                throw new Error('Error adding class to lesson', err);
            }
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
            allowNull: true,
            defaultValue: ''
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        lessonContent: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Lesson',
    });
    return Lesson;
};
