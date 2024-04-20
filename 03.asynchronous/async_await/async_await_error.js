import {
  db,
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_INVALID_GET_ALL_RECORDS_QUERY,
  BOOKS_TABLE_DROP_QUERY,
  executeRunSqlAsync,
  executeAllSqlAsync,
} from "../lib/sqlite_utils.js";

await executeRunSqlAsync(BOOKS_TABLE_CREATE_QUERY);
await executeRunSqlAsync(BOOKS_RECORD_INSERT_QUERY, ["book1"]);
try {
  await executeRunSqlAsync(BOOKS_RECORD_INSERT_QUERY, ["book1"]);
} catch (err) {
  if (
    err.code === "SQLITE_CONSTRAINT" &&
    err.message.includes("UNIQUE constraint failed")
  ) {
    console.error(err.message);
  } else {
    throw err;
  }
}
try {
  await executeAllSqlAsync(BOOKS_INVALID_GET_ALL_RECORDS_QUERY);
} catch (err) {
  if (err.code === "SQLITE_ERROR" && err.message.includes("no such column")) {
    console.error(err.message);
  } else {
    throw err;
  }
}
await executeRunSqlAsync(BOOKS_TABLE_DROP_QUERY);
db.close();
