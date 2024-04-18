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
    db.run(
      `INSERT INTO ${tableName} (title) VALUES(?)`,
      [`${data}`],
      function (err) {
        if (err) {
          reject(err);
        } else {
          let newRecordId = this.lastID;
          resolve(newRecordId);
        }
      },
    );
  });
}

export function getAllData(db, tableName, column) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT ${column} FROM ${tableName}`, (err, rows) => {
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
