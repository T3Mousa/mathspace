'use strict';
const {
    Model,
    Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.Teacher, { foreignKey: 'userId', constraints: false, scope: { userRole: 'teacher' }, onDelete: 'cascade', hooks: true })
            User.hasOne(models.Student, { foreignKey: 'userId', constraints: false, scope: { userRole: 'student' }, onDelete: 'cascade', hooks: true })
        }
    }
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profileImg: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        userRole: {
            type: DataTypes.ENUM('teacher', 'student'),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            // validate: {
            //     len: [4, 30],
            //     isNotEmail(value) {
            //         if (Validator.isEmail(value)) {
            //             throw new Error('Cannot be an email.');
            //         }
            //     }
            // }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 256]
            }
        },
        hashedPassword: {
            type: DataTypes.STRING.BINARY,
            allowNull: false,
            validate: {
                len: [60, 60]
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        defaultScope: {
            attributes: {
                exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
            }
        }
    });
    return User;
};
