import {
  db,
  CREATE_TABLE_QUERY,
  INSERT_RECORD_QUERY,
  GET_ALL_RECORDS_QUERY,
  DROP_TABLE_QUERY,
} from "../lib/sqlite_utils.js";

db.run(CREATE_TABLE_QUERY, () => {
  db.run(INSERT_RECORD_QUERY, ["book1"], function () {
    console.log(`id: ${this.lastID}のレコードが追加されました。 `);
    db.all(GET_ALL_RECORDS_QUERY, (_, rows) => {
      console.log(rows);
      db.run(DROP_TABLE_QUERY, () => {
        db.close();
      });
    });
  });
});
