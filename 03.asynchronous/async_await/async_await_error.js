import { db, runAsync, allAsync } from "../lib/asynchronous_functions.js";

const CREATE_TABLE_QUERY =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const INSERT_RECORD_QUERY = "INSERT INTO books (title) VALUES (?)";
const INVALID_GET_ALL_RECORD_QUERY = "SELECT content FROM books";
const DROP_TABLE_QUERY = "DROP TABLE books";

await runAsync(CREATE_TABLE_QUERY);
try {
  await runAsync(INSERT_RECORD_QUERY, ["book1"]);
  await runAsync(INSERT_RECORD_QUERY, ["book1"]);
} catch (err) {
  if (
    err &&
    err.code === "SQLITE_CONSTRAINT" &&
    err.message.includes("UNIQUE constraint failed")
  ) {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await allAsync(INVALID_GET_ALL_RECORD_QUERY);
} catch (err) {
  if (
    err &&
    err.code === "SQLITE_ERROR" &&
    err.message.includes("no such column")
  ) {
    console.error(err.message);
  } else {
    throw err;
  }
}
await runAsync(DROP_TABLE_QUERY);
db.close();
