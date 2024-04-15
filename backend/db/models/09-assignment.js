'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Assignment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Assignment.belongsTo(models.Teacher, { foreignKey: 'teacherId' })
            Assignment.hasMany(models.Grade, { foreignKey: 'assignmentId', onDelete: 'cascade', hooks: 'true' })
            Assignment.belongsToMany(models.Student, { through: models.Grade, foreignKey: 'studentId', otherKey: 'assignmentId' })
            Assignment.hasMany(models.ClassAssignment, { foreignKey: 'assignmentId', onDelete: 'cascade', hooks: 'true' })
            Assignment.belongsToMany(models.Class, { through: models.ClassAssignment, foreignKey: 'classId', otherKey: 'assignmentId' })
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
    Assignment.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 50]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        assignmentContent: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                notPassedDueDate(value) {
                    if (value < new Date()) {
                        throw new Error('Due date must not be in the past.')
                    }
                }
            }
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Assignment',
    });
    return Assignment;
};
