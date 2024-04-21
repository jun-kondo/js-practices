import {
  db,
  executeRunSqlAsync,
  executeAllSqlAsync,
  closeDbAsync,
} from "../lib/sqlite_utils.js";

import {
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_INVALID_GET_ALL_RECORDS_QUERY,
  BOOKS_TABLE_DROP_QUERY,
} from "../lib/shared_query_constants.js";

executeRunSqlAsync(db, BOOKS_TABLE_CREATE_QUERY)
  .then(() => executeRunSqlAsync(db, BOOKS_RECORD_INSERT_QUERY, ["book1"]))
  .then(() => executeRunSqlAsync(db, BOOKS_RECORD_INSERT_QUERY, ["book1"]))
  .catch((err) => {
    if (
      err &&
      err.code === "SQLITE_CONSTRAINT" &&
      err.message.includes("UNIQUE constraint failed")
    ) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => executeAllSqlAsync(db, BOOKS_INVALID_GET_ALL_RECORDS_QUERY))
  .catch((err) => {
    if (
      err &&
      err.code === "SQLITE_ERROR" &&
      err.message.includes("no such column")
    ) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => executeRunSqlAsync(db, BOOKS_TABLE_DROP_QUERY))
  .then(() => closeDbAsync(db));
