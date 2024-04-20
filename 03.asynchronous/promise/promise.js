import {
  db,
  CREATE_TABLE_QUERY,
  INSERT_RECORD_QUERY,
  GET_ALL_RECORDS_QUERY,
  DROP_TABLE_QUERY,
  runAsync,
  allAsync,
} from "../lib/sqlite_utils.js";

runAsync(CREATE_TABLE_QUERY)
  .then(() => runAsync(INSERT_RECORD_QUERY, ["book1"]))
  .then((newRecordId) => {
    console.log(`id: ${newRecordId}のレコードが追加されました。`);
    return allAsync(GET_ALL_RECORDS_QUERY);
  })
  .then((rows) => {
    console.log(rows);
    return runAsync(DROP_TABLE_QUERY);
  })
  .then(() => db.close());
