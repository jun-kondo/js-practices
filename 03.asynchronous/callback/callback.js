import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const CREATE_TABLE_QUERY =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const INSERT_RECORD_QUERY = "INSERT INTO books (title) VALUES (?)";
const GET_ALL_RECORDS_QUERY = "SELECT * FROM books";
const DROP_TABLE_QUERY = "DROP TABLE books";

db.run(CREATE_TABLE_QUERY, () => {
  db.run(INSERT_RECORD_QUERY, ["book1"], function () {
    console.log(`id: ${this.lastID}のレコードが追加されました。 `);
    db.each(GET_ALL_RECORDS_QUERY, (_, row) => {
      console.log(row);
      db.run(DROP_TABLE_QUERY, () => {
        db.close();
      });
    });
  });
});
