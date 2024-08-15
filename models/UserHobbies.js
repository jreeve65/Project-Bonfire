// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class UserHobbies extends Model {}

UserHobbies.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        hobby_id: {
            type: DataTypes.INTEGER,
            references:{
                model: 'Hobby',
                key: 'id',
            }
        },
        user_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "UserHobbies",
    }
);

module.exports = UserHobbies;