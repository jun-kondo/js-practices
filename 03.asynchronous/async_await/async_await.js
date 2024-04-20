import {
  db,
  CREATE_TABLE_QUERY,
  INSERT_RECORD_QUERY,
  GET_ALL_RECORDS_QUERY,
  DROP_TABLE_QUERY,
  runAsync,
  allAsync,
} from "../lib/asynchronous_functions.js";

await runAsync(CREATE_TABLE_QUERY);
const newRecordId = await runAsync(INSERT_RECORD_QUERY, ["book1"]);
console.log(`id: ${newRecordId}のレコードが追加されました。`);
const rows = await allAsync(GET_ALL_RECORDS_QUERY);
console.log(rows);
await runAsync(DROP_TABLE_QUERY);
db.close();
