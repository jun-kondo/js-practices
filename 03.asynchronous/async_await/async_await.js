import sqlite3 from "sqlite3";
import {
  createTable,
  insertData,
  getLastData,
  getAllData,
  // } from "../promise/promise_methods.js";
} from "./async_await_methods.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const data = "book1";
const column = "*";

async function executeCorrectly(db, tableName, data) {
  let result = await createTable(db, tableName);
  console.log(result);
  result = await insertData(db, tableName, data);
  console.log(result);
  result = await getLastData(db, tableName, column);
  console.log(result);
  result = await getAllData(db, tableName, column);
  console.log(result);
  db.close();
  console.log("終了します");
}

executeCorrectly(db, tableName, data);
