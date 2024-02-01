'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Teacher.belongsTo(models.User, { foreignKey: 'userId' })
            Teacher.hasMany(models.Class, { foreignKey: 'teacherId', onDelete: 'cascade', hooks: 'true' })
            Teacher.hasMany(models.Lesson, { foreignKey: 'teacherId', onDelete: 'cascade', hooks: 'true' })
            Teacher.hasMany(models.Assignment, { foreignKey: 'teacherId', onDelete: 'cascade', hooks: 'true' })
        }
    }
    Teacher.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Teacher',
    });
    return Teacher;
};
