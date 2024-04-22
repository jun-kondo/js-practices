import { db } from "../lib/sqlite_utils.js";

import {
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_ALL_RECORDS_GET_QUERY,
  BOOKS_TABLE_DROP_QUERY,
} from "../lib/shared_query_constants.js";

db.run(BOOKS_TABLE_CREATE_QUERY, () => {
  db.run(BOOKS_RECORD_INSERT_QUERY, ["book1"], function () {
    console.log(`id: ${this.lastID}のレコードが追加されました。 `);
    db.all(BOOKS_ALL_RECORDS_GET_QUERY, (_, rows) => {
      console.log(rows);
      db.run(BOOKS_TABLE_DROP_QUERY, () => {
        db.close();
      });
    });
  });
});
