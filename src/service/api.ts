import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { insertOfflineRequestInQueue } from 'database/offlineApiRequests';
import { Task } from 'dto/task';

const checkInternetConnectivity = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected;
};

const instance = axios.create({
  baseURL: 'http://10.107.130.76:3000',
  timeout: 5000
});

instance.interceptors.request.use(
  async (config) => {
    const isConnected = await checkInternetConnectivity();
    console.log(config.data);
    if (!isConnected) {
      const { transformRequest, transformResponse, ...configCopy } = config;
      insertOfflineRequestInQueue({ apiRequest: JSON.stringify(configCopy) });
    } else {
      return config;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
export default instance;
