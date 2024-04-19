import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const TABLE_CREATION_SQL =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const RECORD_INSERTION_SQL = "INSERT INTO books (title) VALUES(?)";
const ALL_RECORDS_ACQUISITION_SQL = "SELECT * FROM books";

db.run(TABLE_CREATION_SQL, () => {
  db.run(RECORD_INSERTION_SQL, ["book1"], function () {
    console.log(`id: ${this.lastID}のレコードが追加されました。 `);
    db.each(ALL_RECORDS_ACQUISITION_SQL, (_, row) => {
      console.log(row);
      db.close();
    });
  });
});
