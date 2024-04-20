import {
  db,
  CREATE_TABLE_QUERY,
  INSERT_RECORD_QUERY,
  INVALID_GET_ALL_RECORD_QUERY,
  DROP_TABLE_QUERY,
  runAsync,
  allAsync,
} from "../lib/asynchronous_functions.js";

await runAsync(CREATE_TABLE_QUERY);
await runAsync(INSERT_RECORD_QUERY, ["book1"]);
try {
  await runAsync(INSERT_RECORD_QUERY, ["book1"]);
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
  await allAsync(INVALID_GET_ALL_RECORD_QUERY);
} catch (err) {
  if (err.code === "SQLITE_ERROR" && err.message.includes("no such column")) {
    console.error(err.message);
  } else {
    throw err;
  }
}
await runAsync(DROP_TABLE_QUERY);
db.close();
