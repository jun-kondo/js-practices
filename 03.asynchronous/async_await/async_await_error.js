import sqlite3 from "sqlite3";
import {
  createTable,
  insertData,
  getAllData,
  // } from "../promise/promise_methods.js";
} from "./async_await_methods.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const wrongName = "dvds";
const data = "book1";

async function causeError(db, tableName, wrongName, data) {
  let result = await createTable(db, tableName);
  console.log(result);
  try {
    result = await insertData(db, wrongName, data);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
  try {
    result = await getAllData(db, wrongName);
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    db.close();
  }
  console.log("終了します");
}

causeError(db, tableName, wrongName, data);
