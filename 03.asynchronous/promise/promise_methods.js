export function createTable(db, tableName) {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE ${tableName} (id integer primary key autoincrement, title text not null unique)`,
      (err) => {
        if (err) {
          reject(err);
        } else {
          console.log(`テーブル:${tableName}が作成されました`);
          resolve();
        }
      },
    );
  });
}

export function insertData(db, tableName, data) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO ${tableName} (title) VALUES(?)`, [`${data}`], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function getLastData(db, tableName) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM ${tableName} ORDER BY id DESC LIMIT 1`,
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          console.log(`id: ${row.id}のレコードが追加されました。 `);
          resolve();
        }
      },
    );
  });
}

export function getAllData(db, tableName) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        for (let row of rows) {
          console.log(row);
        }
        resolve();
      }
    });
  });
}
