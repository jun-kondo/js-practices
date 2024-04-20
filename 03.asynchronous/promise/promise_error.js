import {
  db,
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_INVALID_GET_ALL_RECORDS_QUERY,
  BOOKS_TABLE_DROP_QUERY,
  executeRunSqlAsync,
  executeAllSqlAsync,
} from "../lib/sqlite_utils.js";

executeRunSqlAsync(BOOKS_TABLE_CREATE_QUERY)
  .then(() => executeRunSqlAsync(BOOKS_RECORD_INSERT_QUERY, ["book1"]))
  .then(() => executeRunSqlAsync(BOOKS_RECORD_INSERT_QUERY, ["book1"]))
  .catch((err) => {
    if (
      err.code === "SQLITE_CONSTRAINT" &&
      err.message.includes("UNIQUE constraint failed")
    ) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => executeAllSqlAsync(BOOKS_INVALID_GET_ALL_RECORDS_QUERY))
  .catch((err) => {
    if (err.code === "SQLITE_ERROR" && err.message.includes("no such column")) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => executeRunSqlAsync(BOOKS_TABLE_DROP_QUERY))
  .finally(() => db.close());
