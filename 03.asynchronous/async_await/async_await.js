import {
  db,
  CREATE_TABLE_QUERY,
  INSERT_RECORD_QUERY,
  GET_ALL_RECORDS_QUERY,
  DROP_TABLE_QUERY,
  executeRunSqlAsync,
  executeAllSqlAsync,
} from "../lib/sqlite_utils.js";

await executeRunSqlAsync(CREATE_TABLE_QUERY);
const newRecordId = await executeRunSqlAsync(INSERT_RECORD_QUERY, ["book1"]);
console.log(`id: ${newRecordId}のレコードが追加されました。`);
const rows = await executeAllSqlAsync(GET_ALL_RECORDS_QUERY);
console.log(rows);
await executeRunSqlAsync(DROP_TABLE_QUERY);
db.close();
