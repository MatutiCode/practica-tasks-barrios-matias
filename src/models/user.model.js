import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { PersonModel } from "./person.model.js";

export const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  person_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "Peploe",
      key: "id",
    },
  },
});

//relaciones
UserModel.belongsTo(PersonModel, { foreignKey: "person_id", as: "owner" });

(PersonModel.hasOne(UserModel), { foreignKey: "user_id", as: "user" });
