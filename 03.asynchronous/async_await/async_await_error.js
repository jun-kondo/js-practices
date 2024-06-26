import {
  db,
  executeRunSqlAsync,
  executeAllSqlAsync,
  closeDbAsync,
} from "../lib/sqlite_utils.js";
import {
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_ALL_RECORDS_GET_INVALID_QUERY,
  BOOKS_TABLE_DROP_QUERY,
} from "../lib/shared_query_constants.js";

await executeRunSqlAsync(db, BOOKS_TABLE_CREATE_QUERY);
await executeRunSqlAsync(db, BOOKS_RECORD_INSERT_QUERY, ["book1"]);
try {
  await executeRunSqlAsync(db, BOOKS_RECORD_INSERT_QUERY, ["book1"]);
} catch (err) {
  if (
    err &&
    err.code === "SQLITE_CONSTRAINT" &&
    err.message.includes("UNIQUE constraint failed")
  ) {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await executeAllSqlAsync(db, BOOKS_ALL_RECORDS_GET_INVALID_QUERY);
} catch (err) {
  if (
    err &&
    err.code === "SQLITE_ERROR" &&
    err.message.includes("no such column")
  ) {
    console.error(err.message);
  } else {
    throw err;
  }
}
await executeRunSqlAsync(db, BOOKS_TABLE_DROP_QUERY);
await closeDbAsync(db);
