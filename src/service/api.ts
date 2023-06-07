import NetInfo from '@react-native-community/netinfo';
import axios, { AxiosRequestHeaders } from 'axios';
import { insertOfflineRequestInQueue } from 'database/offlineApiRequests';

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
    const isConnected = true;
    console.log('aaaaaa', isConnected);
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
