'use strict';

const { Model, Validator } = require('sequelize');



module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    };

    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: [3, 256],
                    isEmail: true
                }
            },
            hashedPassword: {
                type: DataTypes.STRING.BINARY,
                allowNull: false,
                validate: {
                    len: [60, 60]
                }
            },
            profileImg: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: '',
            }
        }, {
        sequelize,
        modelName: 'User',
        defaultScope: {
            attributes: {
                exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
            }
        }
    }
    );
    return User;
};
