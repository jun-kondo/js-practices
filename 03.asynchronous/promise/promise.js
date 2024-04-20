import {
  db,
  CREATE_TABLE_QUERY,
  INSERT_RECORD_QUERY,
  GET_ALL_RECORDS_QUERY,
  DROP_TABLE_QUERY,
  executeRunSqlAsync,
  executeAllSqlAsync,
} from "../lib/sqlite_utils.js";

executeRunSqlAsync(CREATE_TABLE_QUERY)
  .then(() => executeRunSqlAsync(INSERT_RECORD_QUERY, ["book1"]))
  .then((newRecordId) => {
    console.log(`id: ${newRecordId}のレコードが追加されました。`);
    return executeAllSqlAsync(GET_ALL_RECORDS_QUERY);
  })
  .then((rows) => {
    console.log(rows);
    return executeRunSqlAsync(DROP_TABLE_QUERY);
  })
  .then(() => db.close());
