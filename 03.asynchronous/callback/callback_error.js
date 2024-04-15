import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)",
  () => {
    db.run("INSERT INTO dvds (title) VALUES(?)", ["book1"], (err) => {
      if (err) {
        console.log(err.message);
      } else {
        db.get("SELECT * FROM books ORDER BY id DESC LIMIT 1", (err, row) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log(`id: ${row.id}のレコードが追加されました。 `);
          }
        });
      }
      db.all(`SELECT * FROM dvds`, (err, rows) => {
        if (err) {
          console.log(err.message);
        } else {
          for (let row of rows) {
            console.log(row);
          }
        }
        db.close();
        console.log("終了します");
      });
    });
  },
);
