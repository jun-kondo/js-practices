import {
  BOOKS_TABLE_CREATE_QUERY,
  BOOKS_RECORD_INSERT_QUERY,
  BOOKS_GET_ALL_RECORDS_QUERY,
  BOOKS_TABLE_DROP_QUERY,
  executeRunSqlAsync,
  executeAllSqlAsync,
  closeDbAsync,
} from "../lib/sqlite_utils.js";

try {
  await executeRunSqlAsync(BOOKS_TABLE_CREATE_QUERY);
  const newRecordId = await executeRunSqlAsync(BOOKS_RECORD_INSERT_QUERY, [
    "book1",
  ]);
  console.log(`id: ${newRecordId}のレコードが追加されました。`);
  const rows = await executeAllSqlAsync(BOOKS_GET_ALL_RECORDS_QUERY);
  console.log(rows);
  await executeRunSqlAsync(BOOKS_TABLE_DROP_QUERY);
} finally {
  await closeDbAsync();
}
