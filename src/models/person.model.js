import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const PersonModel = sequelize.define(
  "Person",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Lastname: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  },
  {},
);
