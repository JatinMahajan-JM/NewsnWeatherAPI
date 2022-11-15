const Sequelize = require("sequelize");
import dotenv from "dotenv";
dotenv.config()

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_ROOT}`, `${process.env.DB_PASSWORD}`, {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
