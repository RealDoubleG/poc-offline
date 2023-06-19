import { Task } from 'dto/task';
import { db } from './database';

export const insertTaskInDatabase = async (task: Task): Promise<void> => {
  return new Promise((resolve, reject) => {
    const { id, title, description, finished } = task;
    const sql = id
      ? 'INSERT OR REPLACE INTO tasks (id, title, description, finished) VALUES (?, ?, ?, ?)'
      : 'INSERT OR REPLACE INTO tasks (title, description, finished) VALUES (?, ?, ?)';

    const params = id
      ? [id, title, description, finished]
      : [title, description, finished];

    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, resultSet) => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const fetchDatabaseTasks = (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM tasks',
          [],
          (_, resultSet) => {
            const tasks: Task[] = [];

            for (let i = 0; i < resultSet.rows.length; i++) {
              const { id, title, description, finished } =
                resultSet.rows.item(i);
              tasks.push({ id, title, description, finished });
            }

            resolve(tasks);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      },
      (_error) => {
        resolve([]);
        return false;
      }
    );
  });
};

export const clearDatabaseTasks = () => {
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM tasks',
        [],
        (_, resultSet) => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
};

export const deleteTaskInDatabase = (taskId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM tasks WHERE id = ?',
          [taskId],
          (_, resultSet) => {
            resolve();
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      },
      (_error) => {
        reject();
        return true;
      }
    );
  });
};

export const updateTask = async (task: Task): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'UPDATE tasks SET title = ?, description = ?, finished = ? WHERE id = ?',
          [task.title, task.description, task.finished, task.id],
          () => {
            resolve();
          },
          (error) => {
            console.error('Erro ao atualizar a tarefa:', error);
            reject(error);
            return false;
          }
        );
      },
      (error) => {
        console.error('Erro ao iniciar a transação:', error);
        reject(error);
      }
    );
  });
};

export const fetchDatabaseTasksByFinishedStatus = (
  finished: boolean
): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM tasks WHERE finished = ?',
          [finished ? 1 : 0],
          (_, resultSet) => {
            const tasks: Task[] = [];

            for (let i = 0; i < resultSet.rows.length; i++) {
              const { id, title, description, finished } =
                resultSet.rows.item(i);
              tasks.push({ id, title, description, finished });
            }

            resolve(tasks);
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      },
      (_error) => {
        resolve([]);
        return false;
      }
    );
  });
};
