import sqlite3 from "sqlite3";
import {
  createTable,
  insertData,
  getLastData,
  getAllData,
} from "./async_await_methods.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const data = "book1";

async function executeCorrectly(db, tableName, data) {
  try {
    await createTable(db, tableName);
    await insertData(db, tableName, data);
    await getLastData(db, tableName);
    await getAllData(db, tableName);
  } finally {
    db.close();
    console.log("終了します");
  }
}

executeCorrectly(db, tableName, data);
