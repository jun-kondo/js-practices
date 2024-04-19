import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const CREATE_TABLE =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const INSERT_RECORD = "INSERT INTO books (title) VALUES(?)";
const GET_ALL_RECORDS = "SELECT * FROM books";

db.run(CREATE_TABLE, () => {
  db.run(INSERT_RECORD, ["book1"], function () {
    console.log(`id: ${this.lastID}のレコードが追加されました。 `);
    db.each(GET_ALL_RECORDS, (_, row) => {
      console.log(row);
      db.close();
    });
  });
});
