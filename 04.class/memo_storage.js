import sqlite3 from "sqlite3";

export class MemoStorage {
  #db;
  constructor(dbPath) {
    this.#db = new sqlite3.Database(dbPath);
  }

  setUpTable() {
    return new Promise((resolve, reject) => {
      this.#db.run(
        "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL)",
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }

  getAllMemos() {
    return new Promise((resolve, reject) => {
      this.#db.all("SELECT * FROM memos ORDER BY id", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getMemoContent(memoId) {
    return new Promise((resolve, reject) => {
      this.#db.get(
        "SELECT content FROM memos WHERE id = ?",
        [memoId],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(row.content);
          } else {
            resolve("No memo was found.");
          }
        },
      );
    });
  }

  insertMemo(memo) {
    return new Promise((resolve, reject) => {
      this.#db.run(
        "INSERT INTO memos (title, content) VALUES (?,?)",
        [memo.title, memo.content],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("New memo has been registered.");
          }
        },
      );
    });
  }

  deleteMemo(memoId) {
    return new Promise((resolve, reject) => {
      this.#db.run("DELETE FROM memos WHERE id = ?", [memoId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Selected memo is deleted.");
        }
      });
    });
  }

  closeDb() {
    return new Promise((resolve, reject) => {
      this.#db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
