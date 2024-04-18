import sqlite3 from "sqlite3";
import {
  createTable,
  insertData,
  getAllData,
} from "../lib/asynchronous_functions.js";

const db = new sqlite3.Database(":memory:");
const tableName = "books";
const data = "book1";
const wrongColumn = "content";

async function causeError(db, tableName, data, wrongColumn) {
  await createTable(db, tableName);
  try {
    let newRecordId = await insertData(db, data, wrongColumn);
    console.log(newRecordId);
  } catch (err) {
    console.log(err.message);
  }
  try {
    await getAllData(db, wrongColumn);
  } catch (err) {
    console.log(err.message);
  } finally {
    db.close();
    console.log("終了します");
  }
}

causeError(db, tableName, data, wrongColumn);
