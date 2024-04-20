import {
  db,
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_GET_ALL_RECORDS_QUERY,
  BOOKS_TABLE_DROP_QUERY,
} from "../lib/sqlite_utils.js";

db.run(BOOKS_TABLE_CREATE_QUERY, () => {
  db.run(BOOKS_RECORD_INSERT_QUERY, ["book1"], function () {
    console.log(`id: ${this.lastID}のレコードが追加されました。 `);
    db.all(BOOKS_GET_ALL_RECORDS_QUERY, (_, rows) => {
      console.log(rows);
      db.run(BOOKS_TABLE_DROP_QUERY, () => {
        db.close();
      });
    });
  });
});
