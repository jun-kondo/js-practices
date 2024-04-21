import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");
export const BOOKS_TABLE_CREATE_QUERY =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)";
export const BOOKS_RECORD_INSERT_QUERY = "INSERT INTO books (title) VALUES (?)";
export const BOOKS_GET_ALL_RECORDS_QUERY = "SELECT * FROM books";
export const BOOKS_INVALID_GET_ALL_RECORDS_QUERY = "SELECT content FROM books";
export const BOOKS_TABLE_DROP_QUERY = "DROP TABLE books";

export function executeRunSqlAsync(db, sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function executeAllSqlAsync(db, sql, params) {
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

export function closeDbAsync(db) {
  return new Promise((resolve) => {
    db.close(() => resolve());
  });
}
