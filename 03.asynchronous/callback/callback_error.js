import {
  db,
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_INVALID_GET_ALL_RECORDS_QUERY,
  BOOKS_TABLE_DROP_QUERY,
} from "../lib/sqlite_utils.js";

db.run(BOOKS_TABLE_CREATE_QUERY, () => {
  db.run(BOOKS_RECORD_INSERT_QUERY, ["book1"], () => {
    db.run(BOOKS_RECORD_INSERT_QUERY, ["book1"], (err) => {
      console.error(err.message);
      db.all(BOOKS_INVALID_GET_ALL_RECORDS_QUERY, (err) => {
        console.error(err.message);
        db.run(BOOKS_TABLE_DROP_QUERY, () => {
          db.close();
        });
      });
    });
  });
});
