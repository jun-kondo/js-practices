import sqlite3 from "sqlite3";
import { createTable, insertData, getAllData } from "./async_await_methods.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const wrongName = "dvds";
const data = "book1";

async function causeError(db, tableName, wrongName, data) {
  try {
    await createTable(db, tableName);
    await insertData(db, wrongName, data);
  } catch (err) {
    console.log(err.message);
  }
  try {
    await getAllData(db, wrongName);
  } catch (err) {
    console.log(err.message);
  } finally {
    db.close();
    console.log("終了します");
  }
}

causeError(db, tableName, wrongName, data);
