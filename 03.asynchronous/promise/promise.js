import sqlite3 from "sqlite3";
import { createTable, insertData, getAllData } from "./promise_methods.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const data = "book1";
const column = "*";
createTable(db, tableName)
  .then(() => {
    return insertData(db, tableName, data);
  })
  .then((newRecordId) => {
    console.log(`id: ${newRecordId}のレコードが追加されました。`);
    return getAllData(db, tableName, column);
    // return getLastData(db, tableName);
  })
  .finally(() => {
    db.close();
    console.log("終了します");
  });
