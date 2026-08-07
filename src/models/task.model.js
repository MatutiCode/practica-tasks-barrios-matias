import { DataTypes } from "sequelize";
import { sequelize } from "src/config/database.js";

export const Task = sequelize.define("task.model", {
  id: {
    type: DataTypes.INTEGER,
    primarykey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});
