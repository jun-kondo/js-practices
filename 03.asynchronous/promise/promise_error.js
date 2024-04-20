import {
  db,
  CREATE_TABLE_QUERY,
  INSERT_RECORD_QUERY,
  INVALID_GET_ALL_RECORD_QUERY,
  DROP_TABLE_QUERY,
  runAsync,
  allAsync,
} from "../lib/asynchronous_functions.js";
runAsync(CREATE_TABLE_QUERY)
  .then(() => runAsync(INSERT_RECORD_QUERY, ["book1"]))
  .then(() => runAsync(INSERT_RECORD_QUERY, ["book1"]))
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
  .then(() => allAsync(INVALID_GET_ALL_RECORD_QUERY))
  .catch((err) => {
    if (err.code === "SQLITE_ERROR" && err.message.includes("no such column")) {
      console.error(err.message);
    } else {
      throw err;
    }
  })
  .then(() => runAsync(DROP_TABLE_QUERY))
  .finally(() => db.close());
