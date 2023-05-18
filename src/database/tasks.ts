import { Task } from 'dto/task';
import { db } from './database';

export const insertTask = (task: Task): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO tasks (id, title, description, finished) VALUES (?, ?, ?, ?)',
      [task.id, task.title, task.description, task.finished],
      (_, resultSet) => {
        console.log('Inserção realizada com sucesso!', resultSet);
        return true;
      },
      (_, error) => {
        console.error('Erro ao inserir dados:', error);
        return false;
      }
    );
  });
};

export const fetchTasks = (): Promise<Task[]> => {
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

export const deleteTask = (taskId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM tasks WHERE id = ?',
          [taskId],
          (_, resultSet) => {
            console.log('Registro excluído com sucesso!');
            resolve();
          },
          (_, error) => {
            console.log('Não deu bom!');
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
            console.log('Tarefa atualizada com sucesso!');
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
