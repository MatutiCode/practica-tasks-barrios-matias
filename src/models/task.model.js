import { DataTypes } from "sequelize";
import { sequelize } from "src/config/db.js";

export const Usuario = sequelize.define("task.model", {
  id: {
    type: DataType.INTEGER,
    primarykey: true,
    autoIncrement: true,
  },
  title: {
    type: DataType.STRING(100),
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataType.STRING(100),
    allowNull: false,
  },
  isComplete: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
});
