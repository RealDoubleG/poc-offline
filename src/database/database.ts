import { openDatabase } from 'expo-sqlite';

export const db = openDatabase('task');

const scripts = [
  `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT, 
    description TEXT , 
    finished INTEGER DEFAULT 0 NOT NULL
  );`,
  "SELECT name FROM sqlite_master WHERE type='table'"
];

export const initDatabase = (): void => {
  db.exec([{ args: [], sql: 'PRAGMA foreign_keys = ON' }], false, (_, result) =>
    console.log(result)
  );

  db.transaction((tx) =>
    scripts.forEach((sql) => {
      tx.executeSql(sql, [], (_, result) => {
        const tables = result.rows._array;

        const tablesName = tables.map((table) => table.name);

        console.log(`Tabelas criadas: ${tablesName}`);
      });
    })
  );
};
