// Third-party Modules
const { Model, DataTypes } = require("sequelize");

// Local Modules
const sequelize = require("../config/connection");

class Hobby extends Model {}

Hobby.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
   hobby_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
    // Reminder- Add any new columns to the ExampleData model here
 {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "hobby",
  }
);
module.exports = Hobby;
