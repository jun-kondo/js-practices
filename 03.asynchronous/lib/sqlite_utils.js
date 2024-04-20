import sqlite3 from "sqlite3";
export const db = new sqlite3.Database(":memory:");
export const CREATE_TABLE_QUERY =
  "CREATE TABLE books (id integer primary key autoincrement, title text not null unique)";
export const INSERT_RECORD_QUERY = "INSERT INTO books (title) VALUES (?)";
export const GET_ALL_RECORDS_QUERY = "SELECT * FROM books";
export const INVALID_GET_ALL_RECORD_QUERY = "SELECT content FROM books";
export const DROP_TABLE_QUERY = "DROP TABLE books";

export function executeRunSqlAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        const newRecordId = this.lastID;
        resolve(newRecordId);
      }
    });
  });
}

export function executeAllSqlAsync(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
