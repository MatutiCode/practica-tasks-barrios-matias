import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("tasks_users_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
