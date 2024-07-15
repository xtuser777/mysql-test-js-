require('dotenv').config();

const mysql = require("mysql2/promise");

/**
 * @type {Database}
 */
let instance = undefined;

/**
 * @type {mysql.Connection}
 */
let connection = undefined;

class Database {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }

    instance = this;
  }

  async getConnection() {
    try {
      if (!connection) {
        connection = await mysql.createConnection({
          host: process.env.DB_HOSTNAME,
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_SCHEMA,
        });
      }
    } catch (err) {
      console.error(err);
    }

    return connection;
  }

  async close() {
    try {
      if (connection) {
        await connection.end();
        connection = undefined;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

let databaseInstance = Object.freeze(new Database());

module.exports = databaseInstance;