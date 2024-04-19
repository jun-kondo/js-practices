import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const SQL_CREATE_TABLE =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const SQL_INSERT_RECORD = "INSERT INTO books (title) VALUES(?)";
const SQL_GET_ALL_RECORDS = "SELECT * FROM books";

db.run(SQL_CREATE_TABLE, () => {
  db.run(SQL_INSERT_RECORD, ["book1"], function () {
    console.log(`id: ${this.lastID}のレコードが追加されました。 `);
    db.each(SQL_GET_ALL_RECORDS, (_, row) => {
      console.log(row);
      db.close();
    });
  });
});
