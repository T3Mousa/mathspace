'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Class.belongsTo(models.Teacher, { foreignKey: 'teacherId' })
            Class.hasMany(models.ClassEnrollment, { foreignKey: 'classId', onDelete: 'cascade', hooks: 'true' })
            Class.belongsToMany(models.Student, { through: models.ClassEnrollment, foreignKey: 'studentId', otherKey: 'classId' })
            // Class.hasMany(models.Lesson, { foreignKey: 'classId', onDelete: 'cascade', hooks: 'true' })
            // Class.hasMany(models.Assignment, { foreignKey: 'classId', onDelete: 'cascade', hooks: 'true' })
            Class.hasMany(models.ClassLesson, { foreignKey: 'classId', onDelete: 'cascade', hooks: 'true' })
            Class.belongsToMany(models.Lesson, { through: models.ClassLesson, foreignKey: 'lessonId', otherKey: 'classId' })
            Class.hasMany(models.ClassAssignment, { foreignKey: 'classId', onDelete: 'cascade', hooks: 'true' })
            Class.belongsToMany(models.Assignment, { through: models.ClassAssignment, foreignKey: 'assignmentId', otherKey: 'classId' })
        }
    }
    Class.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 50]
            }
        },
        classImg: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Class',
    });
    return Class;
};
