import { db, runAsync, allAsync } from "../lib/asynchronous_functions.js";

const CREATE_TABLE_QUERY =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const INSERT_RECORD_QUERY = "INSERT INTO books (title) VALUES (?)";
const GET_ALL_RECORDS_QUERY = "SELECT * FROM books";
const DROP_TABLE_QUERY = "DROP TABLE books";

runAsync(CREATE_TABLE_QUERY)
  .then(() => runAsync(INSERT_RECORD_QUERY, ["book1"]))
  .then((newRecordId) => {
    console.log(`id: ${newRecordId}のレコードが追加されました。`);
    return allAsync(GET_ALL_RECORDS_QUERY);
  })
  .then((rows) => {
    console.log(rows);
    return runAsync(DROP_TABLE_QUERY);
  })
  .then(() => db.close());
