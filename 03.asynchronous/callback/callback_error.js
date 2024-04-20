import {
  db,
  CREATE_TABLE_QUERY,
  INSERT_RECORD_QUERY,
  INVALID_GET_ALL_RECORD_QUERY,
  DROP_TABLE_QUERY,
} from "../lib/sqlite_utils.js";

db.run(CREATE_TABLE_QUERY, () => {
  db.run(INSERT_RECORD_QUERY, ["book1"], () => {
    db.run(INSERT_RECORD_QUERY, ["book1"], (err) => {
      console.error(err.message);
      db.all(INVALID_GET_ALL_RECORD_QUERY, (err) => {
        console.error(err.message);
        db.run(DROP_TABLE_QUERY, () => {
          db.close();
        });
      });
    });
  });
});
