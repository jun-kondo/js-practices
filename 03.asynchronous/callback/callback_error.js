import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const CREATE_TABLE_QUERY =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const INSERT_RECORD_QUERY = "INSERT INTO books (title) VALUES (?)";
const INVALID_GET_ALL_RECORD_QUERY = "SELECT content FROM books";
const DROP_TABLE_QUERY = "DROP TABLE books";

db.run(CREATE_TABLE_QUERY, () => {
  db.run(INSERT_RECORD_QUERY, ["book1"], () => {
    db.run(INSERT_RECORD_QUERY, ["book1"], (err) => {
      console.error(err.message);
      db.all(INVALID_GET_ALL_RECORD_QUERY, (err) => {
        console.error(err.message);
        db.run(DROP_TABLE_QUERY, () => {
          db.close();
        });
      });
    });
  });
});
