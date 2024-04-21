import sqlite3 from "sqlite3";

export const db = new sqlite3.Database(":memory:");

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
