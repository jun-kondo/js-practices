import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

// テーブルを作成する
db.run(
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)",
  () => {
    //   2. レコードを追加し、自動採番された ID を標準出力に出力する
    db.run("INSERT INTO books (title) VALUES(?)", ["book1"], () => {
      db.get("SELECT * FROM books ORDER BY id DESC LIMIT 1", (_, row) => {
        console.log(`id: ${row.id}のレコードが追加されました。 `);
        // 3. レコードを取得し、それを標準出力に出力する
        db.all("SELECT * FROM books", (_, rows) => {
          for (let row of rows) {
            console.log(row);
          }
          db.close();
          console.log("終了します");
        });
      });
    });
  },
);
