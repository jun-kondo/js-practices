import {
  db,
  executeRunSqlAsync,
  executeAllSqlAsync,
  closeDbAsync,
} from "../lib/sqlite_utils.js";

import {
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_GET_ALL_RECORDS_QUERY,
  BOOKS_TABLE_DROP_QUERY,
} from "../lib/shared_query_constants.js";

executeRunSqlAsync(db, BOOKS_TABLE_CREATE_QUERY)
  .then(() => executeRunSqlAsync(db, BOOKS_RECORD_INSERT_QUERY, ["book1"]))
  .then((result) => {
    console.log(`id: ${result.lastID}のレコードが追加されました。`);
    return executeAllSqlAsync(db, BOOKS_GET_ALL_RECORDS_QUERY);
  })
  .then((rows) => {
    console.log(rows);
    return executeRunSqlAsync(db, BOOKS_TABLE_DROP_QUERY);
  })
  .then(() => closeDbAsync(db));
