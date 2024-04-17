import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

const CREATE_TABLE =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
const INSERT_RECORD = "INSERT INTO books (title) VALUES(?)";
const GET_ALL_RECORDS = "SELECT * FROM books";
// テーブルを作成する
db.run(CREATE_TABLE, () => {
  //   2. レコードを追加し、自動採番された ID を標準出力に出力する
  db.run(INSERT_RECORD, ["book1"], function () {
    console.log(`id: ${this.lastID}のレコードが追加されました。 `);
    db.each(GET_ALL_RECORDS, (_, row) => {
      console.log(row);
    });
  });
});
db.close();
