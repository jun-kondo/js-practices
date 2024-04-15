import sqlite3 from "sqlite3";
import { createTable, insertData, getAllData } from "./promise_methods.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const wrongName = "dvds";
const data = "book1";

createTable(db, tableName)
  .then(() => {
    return insertData(db, wrongName, data);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .then(() => {
    return getAllData(db, wrongName);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    db.close();
    console.log("終了します");
  });
