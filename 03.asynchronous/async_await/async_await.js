import sqlite3 from "sqlite3";
import {
  createTable,
  insertData,
  getAllData,
} from "../lib/asynchronous_functions.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const data = "book1";
const column = "*";

async function executeCorrectly(db, tableName, data, column) {
  await createTable(db, tableName);
  let newRecordId = await insertData(db, tableName, data);
  console.log(`id: ${newRecordId}のレコードが追加されました。`);
  await getAllData(db, tableName, column);
  db.close();
  console.log("終了します");
}

executeCorrectly(db, tableName, data, column);
