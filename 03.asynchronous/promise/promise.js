import {
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_GET_ALL_RECORDS_QUERY,
  BOOKS_TABLE_DROP_QUERY,
  executeRunSqlAsync,
  executeAllSqlAsync,
  closeDbAsync,
} from "../lib/sqlite_utils.js";

executeRunSqlAsync(BOOKS_TABLE_CREATE_QUERY)
  .then(() => executeRunSqlAsync(BOOKS_RECORD_INSERT_QUERY, ["book1"]))
  .then((newRecordId) => {
    console.log(`id: ${newRecordId}のレコードが追加されました。`);
    return executeAllSqlAsync(BOOKS_GET_ALL_RECORDS_QUERY);
  })
  .then((rows) => {
    console.log(rows);
    return executeRunSqlAsync(BOOKS_TABLE_DROP_QUERY);
  })
  .finally(() => closeDbAsync());
