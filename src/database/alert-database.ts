import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "src/database/alert-database.ts",
	logging: false,
});
