const mysql = require("mysql2");
console.log("ENV CHECK:", {
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  database: process.env.MYSQLDATABASE
});



//  MUST use createPool on Railway
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  //  REQUIRED for Railway MySQL
  ssl: {
    rejectUnauthorized: false
  }
});

//  Safe connection test
pool.getConnection((err, connection) => {
  if (err) {
    console.error(" MySQL connection failed:", err);
  } else {
    console.log(" MySQL connected to Railway");
    connection.release();
  }
});

module.exports = pool;
