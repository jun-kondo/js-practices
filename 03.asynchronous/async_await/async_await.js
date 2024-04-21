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

await executeRunSqlAsync(db, BOOKS_TABLE_CREATE_QUERY);
const result = await executeRunSqlAsync(db, BOOKS_RECORD_INSERT_QUERY, [
  "book1",
]);
console.log(`id: ${result.lastID}のレコードが追加されました。`);
const rows = await executeAllSqlAsync(db, BOOKS_GET_ALL_RECORDS_QUERY);
console.log(rows);
await executeRunSqlAsync(db, BOOKS_TABLE_DROP_QUERY);
await closeDbAsync(db);
