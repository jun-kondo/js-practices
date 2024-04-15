import sqlite3 from "sqlite3";
import {
  createTable,
  insertData,
  getLastData,
  getAllData,
} from "./promise_methods.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const data = "book1";
createTable(db, tableName)
  .then(() => {
    return insertData(db, tableName, data);
  })
  .then(() => {
    return getLastData(db, tableName);
  })
  .then(() => {
    return getAllData(db, tableName);
  })
  .finally(() => {
    db.close();
    console.log("終了します");
  });
