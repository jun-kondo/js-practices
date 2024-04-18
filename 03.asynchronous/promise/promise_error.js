import sqlite3 from "sqlite3";
import { createTable, insertData, getAllData } from "./promise_methods.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const data = "book1";
const wrongColumn = "content";

createTable(db, tableName)
  .then(() => {
    return insertData(db, tableName, data);
  })
  .then(() => {
    return insertData(db, tableName, data);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .then(() => {
    return getAllData(db, tableName, wrongColumn);
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    db.close();
    console.log("終了します");
  });
