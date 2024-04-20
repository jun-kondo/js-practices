import {
  db,
  CREATE_TABLE_QUERY,
  INSERT_RECORD_QUERY,
  INVALID_GET_ALL_RECORD_QUERY,
  DROP_TABLE_QUERY,
  executeRunSqlAsync,
  executeAllSqlAsync,
} from "../lib/sqlite_utils.js";

executeRunSqlAsync(CREATE_TABLE_QUERY)
  .then(() => executeRunSqlAsync(INSERT_RECORD_QUERY, ["book1"]))
  .then(() => executeRunSqlAsync(INSERT_RECORD_QUERY, ["book1"]))
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
  .then(() => executeAllSqlAsync(INVALID_GET_ALL_RECORD_QUERY))
  .catch((err) => {
    if (err.code === "SQLITE_ERROR" && err.message.includes("no such column")) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => executeRunSqlAsync(DROP_TABLE_QUERY))
  .finally(() => db.close());
