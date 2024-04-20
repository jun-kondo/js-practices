import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const CREATE_TABLE =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const INSERT_RECORD = "INSERT INTO books (title) VALUES(?)";
const INVALID_SQL = "SELECT content FROM books";
const DROP_TABLE_QUERY = "DROP TABLE books";

db.run(CREATE_TABLE, () => {
  db.run(INSERT_RECORD, ["book1"], () => {
    db.run(INSERT_RECORD, ["book1"], (err) => {
      console.error(err.message);
      db.each(INVALID_SQL, (err) => {
        console.error(err.message);
        db.run(DROP_TABLE_QUERY, () => {
          db.close();
        });
      });
    });
  });
});
