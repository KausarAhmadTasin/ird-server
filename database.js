const sqlite3 = require("sqlite3").verbose();
const path = require("path");
require("dotenv").config(); // Load environment variables from .env file

const DB_PATH = process.env.DB_PATH || path.resolve(__dirname, "dua.sqlite");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");

    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY,
      name TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS sub_category (
      id INTEGER PRIMARY KEY,
      category_id INTEGER,
      name TEXT,
      FOREIGN KEY (category_id) REFERENCES category(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS dua (
      id INTEGER PRIMARY KEY,
      sub_category_id INTEGER,
      name TEXT,
      dua_text TEXT,
      FOREIGN KEY (sub_category_id) REFERENCES sub_category(id)
    )`);
  }
});

module.exports = db;
