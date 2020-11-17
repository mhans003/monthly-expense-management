require("dotenv").config();

module.exports = {
  development: {
    username: process.env.dbUsername,
    password: process.env.dbPassword,
    database: process.env.dbName,
    host: process.env.dbHost,
    dialect: process.env.dbDialect
  },
  test: {
    username: "root",
    password: "",
    database: "passport_demo",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    // eslint-disable-next-line camelcase
    use_env_variable: "DATABASE_URL"
  }
};
