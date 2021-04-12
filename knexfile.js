module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PSWD,
      database: "yrcovid",
      charset: "utf8"
    }
  },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_URL
  }
};