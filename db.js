const sql = require('mssql')
var config = {
    user: "sa",
    password: "abc",
    server: "DESKTOP-8PK2AOR\\SQLEXPRESS",
    database: "customers",
    options: {
      trustedConnection: true
    },
    port: '1433',
    trustServerCertificate: true,
  };

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}