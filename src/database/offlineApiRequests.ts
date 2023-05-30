import { OfflineRequest } from 'dto/offlineRequest';
import { db } from './database';

export const insertOfflineRequest = ({
  apiRequest
}: Omit<OfflineRequest, 'id'>): void => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT OR REPLACE INTO offlineApiRequests (apiRequest) VALUES (?)',
      [JSON.stringify(apiRequest)],
      (_, resultSet) => {
        return true;
      },
      (_, error) => {
        return false;
      }
    );
  });
};

export const deleteOfflineRequest = (requestId: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM offlineApiRequests WHERE id = ?',
          [requestId],
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

export const listOfflineRequests = (): Promise<OfflineRequest[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM offlineApiRequests',
          [],
          (_, resultSet) => {
            const OfflineRequests: OfflineRequest[] = [];

            for (let i = 0; i < resultSet.rows.length; i++) {
              const { id, apiRequest } = resultSet.rows.item(i);
              OfflineRequests.push({ id, apiRequest });
            }

            resolve(OfflineRequests);
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
