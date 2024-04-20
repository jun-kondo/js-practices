import { db, runAsync, allAsync } from "../lib/asynchronous_functions.js";

const CREATE_TABLE_QUERY =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const INSERT_RECORD_QUERY = "INSERT INTO books (title) VALUES (?)";
const GET_ALL_RECORDS_QUERY = "SELECT * FROM books";
const DROP_TABLE_QUERY = "DROP TABLE books";

await runAsync(CREATE_TABLE_QUERY);
const newRecordId = await runAsync(INSERT_RECORD_QUERY, ["book1"]);
console.log(`id: ${newRecordId}のレコードが追加されました。`);
const rows = await allAsync(GET_ALL_RECORDS_QUERY);
console.log(rows);
await runAsync(DROP_TABLE_QUERY);
db.close();
